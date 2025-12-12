'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import testService from '@/services/testService';

export default function TestDetailPage() {
    const params = useParams();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.id) {
            fetchTest();
        }
    }, [params.id]);

    const fetchTest = async () => {
        try {
            setLoading(true);
            const response = await testService.getById(params.id);
            if (response.success) {
                setTest(response.data.test);
            } else {
                setError('Test not found');
            }
        } catch (error) {
            setError('Failed to load test details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner text="Loading test details..." />
            </div>
        );
    }

    if (error || !test) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">{error || 'Test not found'}</h3>
                    <Link href="/tests" className="text-primary-600 hover:text-primary-700 font-medium">
                        ← Back to Tests
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn">
            {/* Breadcrumb */}
            <section className="bg-gray-50 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/tests" className="text-gray-500 hover:text-primary-600">Tests</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{test.title}</span>
                    </div>
                </div>
            </section>

            {/* Test Details */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Image */}
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl h-80 md:h-96 flex items-center justify-center">
                            <div className="w-32 h-32 bg-primary-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                        </div>

                        {/* Details */}
                        <div>
                            <div className="mb-4">
                                <span className="px-3 py-1 bg-secondary-400 text-gray-900 text-sm font-semibold rounded-full">
                                    {test.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {test.title}
                            </h1>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {test.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-sm text-gray-500 mb-1">Sample Type</div>
                                    <div className="font-semibold text-gray-900 flex items-center">
                                        <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        {test.sampleType}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-sm text-gray-500 mb-1">Report Time</div>
                                    <div className="font-semibold text-gray-900 flex items-center">
                                        <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        24 Hours
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-gray-500 text-sm">Price</span>
                                        <div className="text-3xl font-bold text-primary-600">₹{test.price}</div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <Link
                                        href={`/patient/book?testId=${test._id}`}
                                        className="flex-1 btn-primary text-center"
                                    >
                                        Book This Test
                                    </Link>
                                    <Link
                                        href="/tests"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Back
                                    </Link>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="font-bold text-gray-900 mb-3">Instructions</h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Please carry a valid ID proof to the clinic
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Fasting may be required for certain tests (confirmed upon booking)
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Reports will be available for download within 24 hours
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
