import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { getCurrentUser } from '@/lib/auth';
import { updateBookingSchema, validate } from '@/lib/validation';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, validationErrorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';

// GET - Get single booking
export async function GET(request, { params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return unauthorizedResponse('Not authenticated');
        }

        await connectDB();

        const { id } = await params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return notFoundResponse('Booking not found');
        }

        // Patients can only view their own bookings
        if (currentUser.role === 'patient' && booking.userId._id.toString() !== currentUser.userId) {
            return forbiddenResponse('Access denied');
        }

        return successResponse({ booking });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}

// PUT - Update booking (admin only for status/report, patient for cancellation)
export async function PUT(request, { params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return unauthorizedResponse('Not authenticated');
        }

        await connectDB();

        const { id } = await params;
        const body = await request.json();

        const booking = await Booking.findById(id);
        if (!booking) {
            return notFoundResponse('Booking not found');
        }

        // Only admin can update status and report
        if (currentUser.role !== 'admin') {
            return forbiddenResponse('Admin access required');
        }

        // Validate input
        const validation = validate(updateBookingSchema, body);
        if (!validation.success) {
            return validationErrorResponse(validation.error);
        }

        const updateData = {};
        if (validation.data.status) {
            updateData.status = validation.data.status;
        }
        if (validation.data.reportPDF !== undefined) {
            updateData.reportPDF = validation.data.reportPDF;
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        return successResponse({ booking: updatedBooking }, 'Booking updated successfully');
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
