import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyRefreshToken, generateTokens, setAuthCookies, getTokensFromCookies } from '@/lib/auth';
import { errorResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/errorHandler';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { refreshToken } = await getTokensFromCookies();

        if (!refreshToken) {
            return errorResponse('Refresh token not found', 401);
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            return errorResponse('Invalid or expired refresh token', 401);
        }

        await connectDB();

        // Find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return errorResponse('User not found', 401);
        }

        // Generate new tokens
        const tokens = generateTokens(user);

        // Create response
        const response = NextResponse.json(
            {
                success: true,
                message: 'Token refreshed successfully',
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

        // Set new auth cookies
        return setAuthCookies(response, tokens.accessToken, tokens.refreshToken);
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        return errorResponse(message, statusCode);
    }
}
