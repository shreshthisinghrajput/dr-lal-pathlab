'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';

// Static individual tests data
const INDIVIDUAL_TESTS = [
    { _id: 'sugar-fasting', title: 'Sugar Fasting', price: 60, category: 'Diabetes Tests', description: 'Fasting blood sugar test for diabetes screening', sampleType: 'Blood' },
    { _id: 'random-sugar', title: 'Random Sugar', price: 60, category: 'Diabetes Tests', description: 'Random blood sugar test', sampleType: 'Blood' },
    { _id: 'lipid-profile', title: 'Lipid Profile', price: 630, category: 'Heart Tests', description: 'Complete cholesterol and triglycerides panel', sampleType: 'Blood' },
    { _id: 'thyroid-profile', title: 'Thyroid Profile', price: 550, category: 'Thyroid Tests', description: 'T3, T4, TSH levels for thyroid function', sampleType: 'Blood' },
    { _id: 'kidney-function', title: 'Kidney Function Test', price: 480, category: 'Kidney Tests', description: 'Complete kidney health assessment', sampleType: 'Blood' },
    { _id: 'liver-function', title: 'Liver Function Test', price: 550, category: 'Liver Tests', description: 'Complete liver health check', sampleType: 'Blood' },
    { _id: 'cbc', title: 'Complete Blood Count (CBC)', price: 200, category: 'Blood Tests', description: 'Comprehensive blood analysis', sampleType: 'Blood' },
    { _id: 'vitamin-b12', title: 'Vitamin B12', price: 1200, category: 'Vitamin Tests', description: 'Vitamin B12 level test', sampleType: 'Blood' },
    { _id: 'vitamin-d', title: 'Vitamin D (25 Hydroxy)', price: 1100, category: 'Vitamin Tests', description: 'Vitamin D level assessment', sampleType: 'Blood' },
    { _id: 'urine-rm', title: 'Urine R/M', price: 80, category: 'Urine Tests', description: 'Routine urine examination', sampleType: 'Urine' },
    { _id: 'urine-culture', title: 'Urine Culture', price: 455, category: 'Urine Tests', description: 'Urine culture for infection detection', sampleType: 'Urine' },
    { _id: 'pus-culture', title: 'Pus Culture', price: 960, category: 'Blood Tests', description: 'Pus culture for bacterial identification', sampleType: 'Pus' },
    { _id: 'blood-group', title: 'Blood Group', price: 140, category: 'Blood Tests', description: 'Blood group and Rh factor determination', sampleType: 'Blood' },
    { _id: 'viral-marker', title: 'Viral Marker', price: 950, category: 'Blood Tests', description: 'Hepatitis B, C and HIV screening', sampleType: 'Blood' },
];

const CATEGORIES = [
    'All',
    'Blood Tests',
    'Urine Tests',
    'Thyroid Tests',
    'Diabetes Tests',
    'Liver Tests',
    'Kidney Tests',
    'Heart Tests',
    'Vitamin Tests',
];

export default function TestsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState('');

    const handleBookNow = (testName) => {
        setSelectedTest(testName);
        setIsBookingOpen(true);
    };

    // Filter tests based on category and search
    const filteredTests = INDIVIDUAL_TESTS.filter(test => {
        const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="animate-fadeIn">
            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                packageName={selectedTest}
            />

            {/* Hero Section */}
            <section className="hero-gradient text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tests</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive diagnostic tests with accurate results and quick turnaround
                    </p>
                    <p className="text-lg text-blue-200 mt-2">
                        हमारी जांच सेवाएं | सटीक रिपोर्ट, त्वरित परिणाम
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative md:w-96">
                            <input
                                type="text"
                                placeholder="Search tests..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg
                                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tests Grid */}
            <section className="py-12 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="mb-6 text-gray-600">
                        Showing {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    </div>

                    {filteredTests.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No Tests Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTests.map((test) => (
                                <div key={test._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                    <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-secondary-400 text-gray-900 text-sm font-semibold rounded-full">
                                                {test.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                            {test.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {test.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                </svg>
                                                <span>{test.sampleType}</span>
                                            </div>
                                            <div className="text-xl font-bold text-primary-600">
                                                ₹{test.price}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleBookNow(test.title)}
                                            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
