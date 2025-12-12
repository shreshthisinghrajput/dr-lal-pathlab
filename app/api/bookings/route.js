import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Test from '@/models/Test';
import { getCurrentUser } from '@/lib/auth';
import { bookingSchema, validate } from '@/lib/validation';
import { successResponse, errorResponse, createdResponse, unauthorizedResponse, validationErrorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';

// GET - List bookings
export async function GET(request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return unauthorizedResponse('Not authenticated');
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const skip = (page - 1) * limit;

        // Build query based on role
        let query = {};

        if (currentUser.role === 'patient') {
            // Patients can only see their own bookings
            query.userId = currentUser.userId;
        }

        if (status && status !== 'all') {
            query.status = status;
        }

        const bookings = await Booking.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Booking.countDocuments(query);

        return successResponse({
            bookings,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}

// POST - Create new booking (patient only)
export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return unauthorizedResponse('Not authenticated');
        }

        await connectDB();

        const body = await request.json();

        // Validate input
        const validation = validate(bookingSchema, body);
        if (!validation.success) {
            return validationErrorResponse(validation.error);
        }

        const { testId, bookingDate, bookingTime } = validation.data;

        // Check if test exists
        const test = await Test.findById(testId);
        if (!test) {
            return errorResponse('Test not found', 404);
        }

        // Create booking
        const booking = await Booking.create({
            userId: currentUser.userId,
            testId,
            bookingDate: new Date(bookingDate),
            bookingTime,
            status: 'Pending',
        });

        // Populate the booking
        await booking.populate([
            { path: 'userId', select: 'name email phone' },
            { path: 'testId', select: 'title price category sampleType' },
        ]);

        return createdResponse({ booking }, 'Booking created successfully');
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
