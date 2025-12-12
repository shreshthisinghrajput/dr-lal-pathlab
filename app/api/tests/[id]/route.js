import connectDB from '@/lib/mongodb';
import Test from '@/models/Test';
import { getCurrentUser } from '@/lib/auth';
import { testSchema, validate } from '@/lib/validation';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, validationErrorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';

// GET - Get single test (public)
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const test = await Test.findById(id);

        if (!test) {
            return notFoundResponse('Test not found');
        }

        return successResponse({ test });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}

// PUT - Update test (admin only)
export async function PUT(request, { params }) {
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
        const body = await request.json();

        // Validate input (partial validation for updates)
        const validation = validate(testSchema.partial(), body);
        if (!validation.success) {
            return validationErrorResponse(validation.error);
        }

        const test = await Test.findByIdAndUpdate(
            id,
            validation.data,
            { new: true, runValidators: true }
        );

        if (!test) {
            return notFoundResponse('Test not found');
        }

        return successResponse({ test }, 'Test updated successfully');
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}

// DELETE - Delete test (admin only)
export async function DELETE(request, { params }) {
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

        // Soft delete by setting isActive to false
        const test = await Test.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!test) {
            return notFoundResponse('Test not found');
        }

        return successResponse(null, 'Test deleted successfully');
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
