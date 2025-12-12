export class ApiError extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = 'ApiError';
    }
}

export function handleApiError(error) {
    console.error('API Error:', error);

    if (error instanceof ApiError) {
        return {
            success: false,
            message: error.message,
            errors: error.errors,
            statusCode: error.statusCode,
        };
    }

    // MongoDB duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return {
            success: false,
            message: `${field} already exists`,
            errors: null,
            statusCode: 400,
        };
    }

    // MongoDB validation error
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(e => ({
            field: e.path,
            message: e.message,
        }));
        return {
            success: false,
            message: 'Validation failed',
            errors,
            statusCode: 400,
        };
    }

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
        return {
            success: false,
            message: 'Invalid ID format',
            errors: null,
            statusCode: 400,
        };
    }

    // Default server error
    return {
        success: false,
        message: 'Internal server error',
        errors: null,
        statusCode: 500,
    };
}
