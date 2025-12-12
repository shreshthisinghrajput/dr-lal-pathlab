import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Booking from '@/models/Booking';
import { getCurrentUser } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';

// GET - Get user details with booking history (admin only)
export async function GET(request, { params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return unauthorizedResponse('Not authenticated');
        }

        if (currentUser.role !== 'admin') {
            return forbiddenResponse('Admin access required');
        }

        await connectDB();

        const { id } = await params;

        const user = await User.findById(id);
        if (!user) {
            return notFoundResponse('User not found');
        }

        // Get user's bookings
        const bookings = await Booking.find({ userId: id })
            .sort({ createdAt: -1 })
            .limit(50);

        return successResponse({
            user,
            bookings,
            totalBookings: bookings.length,
        });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
