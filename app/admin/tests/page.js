'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import testService from '@/services/testService';

const CATEGORIES = ['Blood Tests', 'Urine Tests', 'Thyroid Tests', 'Diabetes Tests', 'Liver Tests', 'Kidney Tests', 'Heart Tests', 'Vitamin Tests', 'Hormone Tests', 'Allergy Tests', 'Cancer Markers', 'Infection Tests', 'Other'];
const SAMPLE_TYPES = ['Blood', 'Urine', 'Stool', 'Saliva', 'Swab', 'Tissue', 'Other'];

export default function AdminTestsPage() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTest, setEditingTest] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', sampleType: '', imageURL: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => { fetchTests(); }, []);

    const fetchTests = async () => {
        try {
            setLoading(true);
            const response = await testService.getAll({ limit: 100 });
            if (response.success) setTests(response.data.tests);
        } catch (error) {
            console.error('Failed to fetch tests:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (test = null) => {
        if (test) {
            setEditingTest(test);
            setFormData({ title: test.title, description: test.description, price: test.price.toString(), category: test.category, sampleType: test.sampleType, imageURL: test.imageURL || '' });
        } else {
            setEditingTest(null);
            setFormData({ title: '', description: '', price: '', category: '', sampleType: '', imageURL: '' });
        }
        setError('');
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const data = { ...formData, price: parseFloat(formData.price) };
            const response = editingTest ? await testService.update(editingTest._id, data) : await testService.create(data);
            if (response.success) {
                setShowModal(false);
                fetchTests();
            } else {
                setError(response.message || 'Operation failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this test?')) return;
        try {
            const response = await testService.delete(id);
            if (response.success) fetchTests();
        } catch (error) {
            console.error('Failed to delete test:', error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Test Management</h1>
                    <p className="text-gray-600">Add, edit, or delete diagnostic tests</p>
                </div>
                <button onClick={() => openModal()} className="btn-primary flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Test
                </button>
            </div>

            {loading ? (
                <LoadingSpinner text="Loading tests..." />
            ) : tests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500">No tests found. Add your first test!</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tests.map((test) => (
                                    <tr key={test._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{test.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{test.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{test.category}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{test.sampleType}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-primary-600">₹{test.price}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button onClick={() => openModal(test)} className="text-primary-600 hover:text-primary-700 font-medium text-sm">Edit</button>
                                            <button onClick={() => handleDelete(test._id)} className="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{editingTest ? 'Edit Test' : 'Add New Test'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
                            <div>
                                <label className="form-label">Title</label>
                                <input type="text" required className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="form-label">Description</label>
                                <textarea required rows="3" className="form-input resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Price (₹)</label>
                                    <input type="number" required min="0" step="0.01" className="form-input" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">Category</label>
                                    <select required className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="">Select...</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Sample Type</label>
                                <select required className="form-input" value={formData.sampleType} onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}>
                                    <option value="">Select...</option>
                                    {SAMPLE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Image URL (optional)</label>
                                <input type="url" className="form-input" placeholder="https://..." value={formData.imageURL} onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })} />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 btn-primary disabled:opacity-50">{submitting ? 'Saving...' : 'Save Test'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
