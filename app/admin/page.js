'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import bookingService from '@/services/bookingService';
import testService from '@/services/testService';
import userService from '@/services/userService';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalTests: 0,
        totalBookings: 0,
        totalPatients: 0,
        pendingBookings: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [testsRes, bookingsRes, usersRes] = await Promise.all([
                testService.getAll({ limit: 1 }),
                bookingService.getAll({ limit: 5 }),
                userService.getAll({ limit: 1 }),
            ]);

            const bookings = bookingsRes.data?.bookings || [];

            setStats({
                totalTests: testsRes.data?.pagination?.total || 0,
                totalBookings: bookingsRes.data?.pagination?.total || 0,
                totalPatients: usersRes.data?.pagination?.total || 0,
                pendingBookings: bookings.filter(b => b.status === 'Pending').length,
            });
            setRecentBookings(bookings);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
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
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of LAL PATH CLINIC operations</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Tests', value: stats.totalTests, color: 'primary', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                    { label: 'Total Bookings', value: stats.totalBookings, color: 'blue', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                    { label: 'Total Patients', value: stats.totalPatients, color: 'green', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                    { label: 'Pending', value: stats.pendingBookings, color: 'yellow', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                                <svg className={`w-6 h-6 text-${stat.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Link href="/admin/tests" className="bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors">
                    <svg className="w-8 h-8 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-bold text-lg">Manage Tests</h3>
                    <p className="text-blue-100 text-sm">Add, edit, or delete tests</p>
                </Link>

                <Link href="/admin/bookings" className="bg-secondary-400 text-gray-900 rounded-xl p-6 hover:bg-secondary-300 transition-colors">
                    <svg className="w-8 h-8 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="font-bold text-lg">Manage Bookings</h3>
                    <p className="text-gray-700 text-sm">Update status & upload reports</p>
                </Link>

                <Link href="/admin/camps" className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700 transition-colors">
                    <svg className="w-8 h-8 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-bold text-lg">Health Camps</h3>
                    <p className="text-green-100 text-sm">Manage photos & videos</p>
                </Link>

                <Link href="/admin/patients" className="bg-gray-800 text-white rounded-xl p-6 hover:bg-gray-700 transition-colors">
                    <svg className="w-8 h-8 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="font-bold text-lg">View Patients</h3>
                    <p className="text-gray-400 text-sm">Patient list & history</p>
                </Link>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                        <Link href="/admin/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
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
                        <p className="text-center text-gray-500 py-8">No bookings yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 text-sm">
                                        <th className="pb-3 font-medium">Patient</th>
                                        <th className="pb-3 font-medium">Test</th>
                                        <th className="pb-3 font-medium">Date</th>
                                        <th className="pb-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking._id} className="border-t border-gray-100">
                                            <td className="py-3">{booking.userId?.name || 'N/A'}</td>
                                            <td className="py-3">{booking.testId?.title || 'N/A'}</td>
                                            <td className="py-3">{formatDate(booking.bookingDate)}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
