'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import bookingService from '@/services/bookingService';

export default function PatientDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await bookingService.getAll({ limit: 5 });
            if (response.success) {
                const bookings = response.data.bookings;
                setRecentBookings(bookings);
                setStats({
                    totalBookings: response.data.pagination.total,
                    pendingBookings: bookings.filter(b => b.status === 'Pending').length,
                    completedBookings: bookings.filter(b => b.status === 'Completed').length,
                });
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Sample Collected': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
                <p className="text-gray-600 mt-1">Here&apos;s an overview of your health journey</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Bookings</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Completed</p>
                            <p className="text-3xl font-bold text-green-600">{stats.completedBookings}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link href="/patient/book" className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Book a Test</h3>
                            <p className="text-blue-100">Schedule your next diagnostic test</p>
                        </div>
                    </div>
                </Link>

                <Link href="/patient/bookings" className="bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-xl p-6 text-gray-900 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mr-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">View Reports</h3>
                            <p className="text-gray-700">Download your test reports</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                        <Link href="/patient/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View All →
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : recentBookings.length === 0 ? (
                        <div className="text-center py-8">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-gray-500">No bookings yet</p>
                            <Link href="/patient/book" className="text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block">
                                Book your first test →
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{booking.testId?.title || 'Test'}</h3>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(booking.bookingDate)} at {booking.bookingTime}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
