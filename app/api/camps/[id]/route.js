import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HealthCamp from '@/models/HealthCamp';

// GET single camp
export async function GET(request, { params }) {
    try {
        await connectDB();

        const camp = await HealthCamp.findById(params.id);

        if (!camp) {
            return NextResponse.json(
                { success: false, error: 'Camp not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: camp
        });
    } catch (error) {
        console.error('Error fetching camp:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch camp' },
            { status: 500 }
        );
    }
}

// PUT update camp
export async function PUT(request, { params }) {
    try {
        await connectDB();

        const body = await request.json();

        const camp = await HealthCamp.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!camp) {
            return NextResponse.json(
                { success: false, error: 'Camp not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: camp
        });
    } catch (error) {
        console.error('Error updating camp:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update camp' },
            { status: 500 }
        );
    }
}

// DELETE camp
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const camp = await HealthCamp.findByIdAndDelete(params.id);

        if (!camp) {
            return NextResponse.json(
                { success: false, error: 'Camp not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Camp deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting camp:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete camp' },
            { status: 500 }
        );
    }
}
