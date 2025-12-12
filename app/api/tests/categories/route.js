import connectDB from '@/lib/mongodb';
import Test from '@/models/Test';
import { successResponse, errorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';

// GET - Get all unique categories
export async function GET(request) {
    try {
        await connectDB();

        const categories = await Test.distinct('category', { isActive: true });

        return successResponse({ categories });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
