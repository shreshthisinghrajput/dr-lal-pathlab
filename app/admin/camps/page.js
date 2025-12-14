'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import campService from '@/services/campService';

export default function AdminCampsPage() {
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCamp, setEditingCamp] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        nameHindi: '',
        description: '',
        descriptionHindi: '',
        location: 'Ambikapur, Chhattisgarh',
        services: ['Free Blood Sugar Test', 'Free Blood Pressure Check', 'Free Health Consultation'],
        media: [],
        isActive: true
    });

    useEffect(() => {
        fetchCamps();
    }, []);

    const fetchCamps = async () => {
        try {
            const response = await campService.getAll();
            if (response.success) {
                setCamps(response.data);
            }
        } catch (error) {
            console.error('Error fetching camps:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const response = await campService.uploadFiles(files);
            if (response.success) {
                setFormData(prev => ({
                    ...prev,
                    media: [...prev.media, ...response.data]
                }));
            } else {
                alert('Failed to upload files');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (editingCamp) {
                response = await campService.update(editingCamp._id, formData);
            } else {
                response = await campService.create(formData);
            }

            if (response.success) {
                fetchCamps();
                resetForm();
            } else {
                alert(response.error || 'Failed to save camp');
            }
        } catch (error) {
            console.error('Error saving camp:', error);
            alert('Error saving camp');
        }
    };

    const handleEdit = (camp) => {
        setEditingCamp(camp);
        setFormData({
            name: camp.name,
            nameHindi: camp.nameHindi || '',
            description: camp.description || '',
            descriptionHindi: camp.descriptionHindi || '',
            location: camp.location || 'Ambikapur, Chhattisgarh',
            services: camp.services || [],
            media: camp.media || [],
            isActive: camp.isActive
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this camp?')) return;

        try {
            const response = await campService.delete(id);
            if (response.success) {
                fetchCamps();
            } else {
                alert('Failed to delete camp');
            }
        } catch (error) {
            console.error('Error deleting camp:', error);
            alert('Error deleting camp');
        }
    };

    const removeMedia = (index) => {
        setFormData(prev => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index)
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            nameHindi: '',
            description: '',
            descriptionHindi: '',
            location: 'Ambikapur, Chhattisgarh',
            services: ['Free Blood Sugar Test', 'Free Blood Pressure Check', 'Free Health Consultation'],
            media: [],
            isActive: true
        });
        setEditingCamp(null);
        setShowForm(false);
    };

    const addService = () => {
        const service = prompt('Enter service name:');
        if (service) {
            setFormData(prev => ({
                ...prev,
                services: [...prev.services, service]
            }));
        }
    };

    const removeService = (index) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index)
        }));
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Health Camps Management</h1>
                    <p className="text-gray-600 mt-1">Manage photos and videos of health camps</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    {showForm ? 'Cancel' : '+ Add New Camp'}
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingCamp ? 'Edit Camp' : 'Add New Health Camp'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Camp Name (English)
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Camp Name (Hindi)
                                </label>
                                <input
                                    type="text"
                                    value={formData.nameHindi}
                                    onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (English)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (Hindi)
                                </label>
                                <textarea
                                    value={formData.descriptionHindi}
                                    onChange={(e) => setFormData({ ...formData, descriptionHindi: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Services */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Services Offered
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.services.map((service, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                        {service}
                                        <button
                                            type="button"
                                            onClick={() => removeService(index)}
                                            className="ml-2 text-primary-600 hover:text-primary-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addService}
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                                + Add Service
                            </button>
                        </div>

                        {/* Media Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Photos & Videos
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="media-upload"
                                    disabled={uploading}
                                />
                                <label
                                    htmlFor="media-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    {uploading ? (
                                        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span className="mt-2 text-gray-600">Click to upload photos or videos</span>
                                            <span className="text-sm text-gray-400">JPG, PNG, MP4, WebM</span>
                                        </>
                                    )}
                                </label>
                            </div>

                            {/* Preview uploaded media */}
                            {formData.media.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {formData.media.map((item, index) => (
                                        <div key={index} className="relative group">
                                            {item.type === 'video' ? (
                                                <video
                                                    src={item.url}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="relative w-full h-32">
                                                    <Image
                                                        src={item.url}
                                                        alt="Camp media"
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeMedia(index)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                                Show on website (Active)
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                {editingCamp ? 'Update Camp' : 'Create Camp'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Camps List */}
            <div className="bg-white rounded-xl shadow-md">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">All Health Camps</h2>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : camps.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500">No health camps yet. Click "Add New Camp" to create one.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {camps.map((camp) => (
                                <div key={camp._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Camp Image */}
                                    <div className="relative w-full h-48 bg-gray-100">
                                        {camp.media && camp.media.length > 0 ? (
                                            camp.media[0].type === 'video' ? (
                                                <video
                                                    src={camp.media[0].url}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    src={camp.media[0].url}
                                                    alt={camp.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        {!camp.isActive && (
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                                                Inactive
                                            </div>
                                        )}
                                        {camp.media && camp.media.length > 1 && (
                                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                                                +{camp.media.length - 1} more
                                            </div>
                                        )}
                                    </div>

                                    {/* Camp Info */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900">{camp.name}</h3>
                                        {camp.nameHindi && (
                                            <p className="text-sm text-primary-600">{camp.nameHindi}</p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">{camp.location}</p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(camp.createdAt).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>

                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={() => handleEdit(camp)}
                                                className="flex-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(camp._id)}
                                                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
