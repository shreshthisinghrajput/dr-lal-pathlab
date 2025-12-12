import { clearAuthCookies } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const response = NextResponse.json(
        {
            success: true,
            message: 'Logged out successfully',
        },
        { status: 200 }
    );

    // Clear auth cookies
    return clearAuthCookies(response);
}
