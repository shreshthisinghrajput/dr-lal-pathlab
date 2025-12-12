'use client';

import { useState, useEffect } from 'react';
import BookingCard from '@/components/BookingCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import bookingService from '@/services/bookingService';

export default function PatientBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, [filter]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const params = filter !== 'all' ? { status: filter } : {};
            const response = await bookingService.getAll(params);
            if (response.success) {
                setBookings(response.data.bookings);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadReport = (reportUrl) => {
        if (reportUrl) {
            window.open(reportUrl, '_blank');
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-gray-600">Track your test bookings and download reports</p>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex flex-wrap gap-2">
                {[
                    { value: 'all', label: 'All' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Sample Collected', label: 'Sample Collected' },
                    { value: 'Completed', label: 'Completed' },
                ].map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab.value
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            {loading ? (
                <LoadingSpinner text="Loading bookings..." />
            ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500">No bookings found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onDownloadReport={handleDownloadReport}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
