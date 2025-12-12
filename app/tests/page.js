'use client';

import { useState, useEffect } from 'react';
import TestCard from '@/components/TestCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import testService from '@/services/testService';

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
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTests();
    }, [selectedCategory, searchQuery]);

    const fetchTests = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedCategory !== 'All') {
                params.category = selectedCategory;
            }
            if (searchQuery) {
                params.search = searchQuery;
            }
            const response = await testService.getAll(params);
            if (response.success) {
                setTests(response.data.tests);
            }
        } catch (error) {
            console.error('Failed to fetch tests:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="hero-gradient text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tests</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive diagnostic tests with accurate results and quick turnaround
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
                    {loading ? (
                        <LoadingSpinner text="Loading tests..." />
                    ) : tests.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No Tests Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-gray-600">
                                Showing {tests.length} test{tests.length !== 1 ? 's' : ''}
                                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {tests.map((test) => (
                                    <TestCard key={test._id} test={test} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
