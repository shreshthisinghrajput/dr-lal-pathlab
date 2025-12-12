import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { loginSchema, validate } from '@/lib/validation';
import { generateTokens, setAuthCookies } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        // Validate input
        const validation = validate(loginSchema, body);
        if (!validation.success) {
            return validationErrorResponse(validation.error);
        }

        const { email, password } = validation.data;

        // Find user with password field
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return errorResponse('Invalid email or password', 401);
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return errorResponse('Invalid email or password', 401);
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Create response with user data
        const response = NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                    },
                },
            },
            { status: 200 }
        );

        // Set auth cookies
        return setAuthCookies(response, accessToken, refreshToken);
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
