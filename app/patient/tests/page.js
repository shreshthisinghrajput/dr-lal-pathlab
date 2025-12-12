'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TestCard from '@/components/TestCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import testService from '@/services/testService';

const CATEGORIES = ['All', 'Blood Tests', 'Urine Tests', 'Thyroid Tests', 'Diabetes Tests', 'Liver Tests', 'Kidney Tests', 'Heart Tests', 'Vitamin Tests'];

export default function PatientTestsPage() {
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
            if (selectedCategory !== 'All') params.category = selectedCategory;
            if (searchQuery) params.search = searchQuery;
            const response = await testService.getAll(params);
            if (response.success) setTests(response.data.tests);
        } catch (error) {
            console.error('Failed to fetch tests:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Browse Tests</h1>
                <p className="text-gray-600">Find and book the test you need</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search tests..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            {/* Tests Grid */}
            {loading ? (
                <LoadingSpinner text="Loading tests..." />
            ) : tests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500">No tests found</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map(test => <TestCard key={test._id} test={test} />)}
                </div>
            )}
        </div>
    );
}
