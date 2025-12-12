import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

// Define protected routes
const adminRoutes = ['/admin'];
const patientRoutes = ['/patient'];
const authRoutes = ['/login', '/register'];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get('accessToken')?.value;

    // Check if user is authenticated
    let user = null;
    if (accessToken) {
        user = verifyAccessToken(accessToken);
    }

    // If trying to access auth routes while logged in, redirect to appropriate dashboard
    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (user) {
            const dashboardUrl = user.role === 'admin' ? '/admin' : '/patient';
            return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
        return NextResponse.next();
    }

    // Check admin routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        if (user.role !== 'admin') {
            return NextResponse.redirect(new URL('/patient', request.url));
        }
        return NextResponse.next();
    }

    // Check patient routes
    if (patientRoutes.some(route => pathname.startsWith(route))) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Both admin and patient can access patient routes
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/patient/:path*',
        '/login',
        '/register',
    ],
};
