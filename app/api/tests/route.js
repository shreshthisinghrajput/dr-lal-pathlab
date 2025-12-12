import connectDB from '@/lib/mongodb';
import Test from '@/models/Test';
import { getCurrentUser } from '@/lib/auth';
import { testSchema, validate } from '@/lib/validation';
import { successResponse, errorResponse, createdResponse, unauthorizedResponse, forbiddenResponse, validationErrorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';

// GET - List all tests (public)
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const skip = (page - 1) * limit;

        // Build query
        let query = { isActive: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const tests = await Test.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Test.countDocuments(query);

        return successResponse({
            tests,
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

// POST - Create new test (admin only)
export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return unauthorizedResponse('Not authenticated');
        }

        if (currentUser.role !== 'admin') {
            return forbiddenResponse('Admin access required');
        }

        await connectDB();

        const body = await request.json();

        // Validate input
        const validation = validate(testSchema, body);
        if (!validation.success) {
            return validationErrorResponse(validation.error);
        }

        const test = await Test.create(validation.data);

        return createdResponse({ test }, 'Test created successfully');
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
