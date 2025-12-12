import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { registerSchema, validate } from '@/lib/validation';
import { generateTokens, setAuthCookies } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        // Validate input
        const validation = validate(registerSchema, body);
        if (!validation.success) {
            return validationErrorResponse(validation.error);
        }

        const { name, email, phone, password } = validation.data;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return errorResponse('Email already registered', 400);
        }

        // Create new user (password will be hashed by pre-save hook)
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password,
            role: 'patient', // Default role for registration
        });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Create response with user data
        const response = NextResponse.json(
            {
                success: true,
                message: 'Registration successful',
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
            { status: 201 }
        );

        // Set auth cookies
        return setAuthCookies(response, accessToken, refreshToken);
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
