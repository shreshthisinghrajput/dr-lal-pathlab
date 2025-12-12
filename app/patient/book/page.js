'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import testService from '@/services/testService';
import bookingService from '@/services/bookingService';

function BookingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedTestId = searchParams.get('testId');

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        testId: preselectedTestId || '',
        bookingDate: '',
        bookingTime: '',
    });

    const timeSlots = [
        '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    ];

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await testService.getAll({ limit: 100 });
            if (response.success) {
                setTests(response.data.tests);
            }
        } catch (error) {
            console.error('Failed to fetch tests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const response = await bookingService.create(formData);
            if (response.success) {
                setSuccess(true);
                setTimeout(() => router.push('/patient/bookings'), 2000);
            } else {
                setError(response.message || 'Failed to create booking');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const selectedTest = tests.find(t => t._id === formData.testId);
    const today = new Date().toISOString().split('T')[0];

    if (success) {
        return (
            <div className="max-w-lg mx-auto text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600">Your test has been booked. Redirecting to bookings...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Book a Test</h1>
                <p className="text-gray-600">Fill in the details to schedule your test</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="form-label">Select Test</label>
                        {loading ? (
                            <div className="animate-pulse h-12 bg-gray-200 rounded-lg"></div>
                        ) : (
                            <select
                                required
                                className="form-input"
                                value={formData.testId}
                                onChange={(e) => setFormData({ ...formData, testId: e.target.value })}
                            >
                                <option value="">Choose a test...</option>
                                {tests.map(test => (
                                    <option key={test._id} value={test._id}>
                                        {test.title} - ₹{test.price}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {selectedTest && (
                        <div className="bg-primary-50 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{selectedTest.title}</h3>
                                    <p className="text-sm text-gray-600">{selectedTest.category} • {selectedTest.sampleType}</p>
                                </div>
                                <span className="text-xl font-bold text-primary-600">₹{selectedTest.price}</span>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="form-label">Preferred Date</label>
                        <input
                            type="date"
                            required
                            min={today}
                            className="form-input"
                            value={formData.bookingDate}
                            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="form-label">Preferred Time</label>
                        <select
                            required
                            className="form-input"
                            value={formData.bookingTime}
                            onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                        >
                            <option value="">Select time slot...</option>
                            {timeSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-yellow-800">
                                <p className="font-medium">Important:</p>
                                <p>Please visit the clinic at your scheduled time. Carry a valid ID proof.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || !formData.testId}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function BookTestPage() {
    return (
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <BookingForm />
        </Suspense>
    );
}
