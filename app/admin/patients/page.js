'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import userService from '@/services/userService';

export default function AdminPatientsPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientDetails, setPatientDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => { fetchPatients(); }, [searchQuery]);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const params = searchQuery ? { search: searchQuery } : {};
            const response = await userService.getAll(params);
            if (response.success) setPatients(response.data.users);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const viewPatientDetails = async (patient) => {
        setSelectedPatient(patient);
        setLoadingDetails(true);
        try {
            const response = await userService.getById(patient._id);
            if (response.success) setPatientDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch patient details:', error);
        } finally {
            setLoadingDetails(false);
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
                <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
                <p className="text-gray-600">View patient list and booking history</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="relative">
                    <input type="text" placeholder="Search patients by name, email, or phone..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Patient List */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-md">
                        <div className="p-4 border-b border-gray-100"><h2 className="font-bold text-gray-900">Patients ({patients.length})</h2></div>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {loading ? (
                                <LoadingSpinner size="sm" text="" />
                            ) : patients.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No patients found</p>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {patients.map((patient) => (
                                        <button key={patient._id} onClick={() => viewPatientDetails(patient)} className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedPatient?._id === patient._id ? 'bg-primary-50' : ''}`}>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold mr-3">{patient.name.charAt(0)}</div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{patient.name}</p>
                                                    <p className="text-sm text-gray-500">{patient.phone}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Patient Details */}
                <div className="md:col-span-2">
                    {selectedPatient ? (
                        <div className="bg-white rounded-xl shadow-md">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-2xl mr-4">{selectedPatient.name.charAt(0)}</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h2>
                                        <p className="text-gray-500">{selectedPatient.email}</p>
                                        <p className="text-gray-500">{selectedPatient.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Booking History</h3>
                                {loadingDetails ? (
                                    <LoadingSpinner size="sm" text="" />
                                ) : patientDetails?.bookings?.length === 0 ? (
                                    <p className="text-gray-500">No bookings found</p>
                                ) : (
                                    <div className="space-y-3">
                                        {patientDetails?.bookings?.map((booking) => (
                                            <div key={booking._id} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{booking.testId?.title || 'Test'}</p>
                                                        <p className="text-sm text-gray-500">{formatDate(booking.bookingDate)} at {booking.bookingTime}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md p-12 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            <p className="text-gray-500">Select a patient to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
