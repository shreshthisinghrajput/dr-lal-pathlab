import { z } from 'zod';

// User registration schema
export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password too long'),
});

// User login schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// Test schema
export const testSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters').max(200, 'Title too long'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
    price: z.number().positive('Price must be positive'),
    category: z.string().min(2, 'Category is required'),
    sampleType: z.string().min(2, 'Sample type is required'),
    imageURL: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

// Booking schema
export const bookingSchema = z.object({
    testId: z.string().min(1, 'Test ID is required'),
    bookingDate: z.string().min(1, 'Booking date is required'),
    bookingTime: z.string().min(1, 'Booking time is required'),
});

// Update booking status schema
export const updateBookingSchema = z.object({
    status: z.enum(['Pending', 'Sample Collected', 'Completed']).optional(),
    reportPDF: z.string().url('Invalid PDF URL').optional().or(z.literal('')),
});

// Validate function helper
export function validate(schema, data) {
    try {
        const result = schema.parse(data);
        return { success: true, data: result, error: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            return { success: false, data: null, error: errors };
        }
        return { success: false, data: null, error: [{ field: 'unknown', message: 'Validation failed' }] };
    }
}
