import { NextResponse } from 'next/server';

export function successResponse(data, message = 'Success', statusCode = 200) {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status: statusCode }
    );
}

export function errorResponse(message, statusCode = 400, errors = null) {
    return NextResponse.json(
        {
            success: false,
            message,
            errors,
        },
        { status: statusCode }
    );
}

export function createdResponse(data, message = 'Created successfully') {
    return successResponse(data, message, 201);
}

export function unauthorizedResponse(message = 'Unauthorized') {
    return errorResponse(message, 401);
}

export function forbiddenResponse(message = 'Forbidden') {
    return errorResponse(message, 403);
}

export function notFoundResponse(message = 'Not found') {
    return errorResponse(message, 404);
}

export function validationErrorResponse(errors) {
    return NextResponse.json(
        {
            success: false,
            message: 'Validation failed',
            errors,
        },
        { status: 400 }
    );
}
