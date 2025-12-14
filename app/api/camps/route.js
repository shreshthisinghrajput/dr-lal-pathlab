import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HealthCamp from '@/models/HealthCamp';

// GET all health camps
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const activeOnly = searchParams.get('active') === 'true';
        const limit = parseInt(searchParams.get('limit')) || 50;

        const query = activeOnly ? { isActive: true } : {};

        const camps = await HealthCamp.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json({
            success: true,
            data: camps
        });
    } catch (error) {
        console.error('Error fetching camps:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch camps' },
            { status: 500 }
        );
    }
}

// POST create new health camp
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const camp = await HealthCamp.create(body);

        return NextResponse.json({
            success: true,
            data: camp
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating camp:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create camp' },
            { status: 500 }
        );
    }
}
