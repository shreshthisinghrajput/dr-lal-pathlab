'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import bookingService from '@/services/bookingService';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [reportUrl, setReportUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { fetchBookings(); }, [filter]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const params = filter !== 'all' ? { status: filter } : {};
            const response = await bookingService.getAll(params);
            if (response.success) setBookings(response.data.bookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await bookingService.updateStatus(id, { status });
            if (response.success) fetchBookings();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const openReportModal = (booking) => {
        setSelectedBooking(booking);
        setReportUrl(booking.reportPDF || '');
        setShowReportModal(true);
    };

    const uploadReport = async () => {
        if (!reportUrl.trim()) return;
        setSubmitting(true);
        try {
            const response = await bookingService.updateStatus(selectedBooking._id, { reportPDF: reportUrl, status: 'Completed' });
            if (response.success) {
                setShowReportModal(false);
                fetchBookings();
            }
        } catch (error) {
            console.error('Failed to upload report:', error);
        } finally {
            setSubmitting(false);
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
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
                <p className="text-gray-600">Manage bookings, update status, and upload reports</p>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex flex-wrap gap-2">
                {[{ value: 'all', label: 'All' }, { value: 'Pending', label: 'Pending' }, { value: 'Sample Collected', label: 'Sample Collected' }, { value: 'Completed', label: 'Completed' }].map((tab) => (
                    <button key={tab.value} onClick={() => setFilter(tab.value)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab.value ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <LoadingSpinner text="Loading bookings..." />
            ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500">No bookings found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-900">{booking.testId?.title || 'Test'}</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div><span className="text-gray-500">Patient</span><p className="font-medium">{booking.userId?.name || 'N/A'}</p></div>
                                        <div><span className="text-gray-500">Phone</span><p className="font-medium">{booking.userId?.phone || 'N/A'}</p></div>
                                        <div><span className="text-gray-500">Date</span><p className="font-medium">{formatDate(booking.bookingDate)}</p></div>
                                        <div><span className="text-gray-500">Time</span><p className="font-medium">{booking.bookingTime}</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                                {booking.status === 'Pending' && (
                                    <button onClick={() => updateStatus(booking._id, 'Sample Collected')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                                        Mark Sample Collected
                                    </button>
                                )}
                                {booking.status === 'Sample Collected' && (
                                    <button onClick={() => openReportModal(booking)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                                        Upload Report & Complete
                                    </button>
                                )}
                                {booking.status === 'Completed' && booking.reportPDF && (
                                    <a href={booking.reportPDF} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        View Report
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Report Upload Modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Report</h2>
                        <p className="text-gray-600 text-sm mb-4">Enter the URL of the PDF report for this test. The patient will be able to download this file.</p>
                        <div className="mb-4">
                            <label className="form-label">Report PDF URL</label>
                            <input type="url" className="form-input" placeholder="https://example.com/report.pdf" value={reportUrl} onChange={(e) => setReportUrl(e.target.value)} />
                        </div>
                        <div className="flex space-x-3">
                            <button onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                            <button onClick={uploadReport} disabled={submitting || !reportUrl.trim()} className="flex-1 btn-primary disabled:opacity-50">{submitting ? 'Uploading...' : 'Upload & Complete'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
