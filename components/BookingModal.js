'use client';

import { useState } from 'react';

export default function BookingModal({ isOpen, onClose, packageName = '' }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        testPackage: packageName,
        preferredDate: '',
        preferredTime: '',
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        // Create WhatsApp message with booking details
        const message = `🏥 *New Test Booking Request*

📋 *Patient Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Age: ${formData.age}
• Gender: ${formData.gender}

📍 *Address:*
${formData.address}

🔬 *Test Package:* ${formData.testPackage || 'To be discussed'}

📅 *Preferred Date:* ${formData.preferredDate || 'Flexible'}
⏰ *Preferred Time:* ${formData.preferredTime || 'Flexible'}

---
_Sent from SHREEM Diagnostic Website_`;

        const whatsappUrl = `https://wa.me/919238745983?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const resetAndClose = () => {
        setStep(1);
        setFormData({
            name: '',
            phone: '',
            age: '',
            gender: '',
            address: '',
            testPackage: packageName,
            preferredDate: '',
            preferredTime: '',
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full md:max-w-lg md:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden animate-slideUp max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Book Your Test</h2>
                        <p className="text-blue-200 text-sm">आज ही अपना टेस्ट बुक करें</p>
                    </div>
                    <button
                        onClick={resetAndClose}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    {step > s ? '✓' : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-16 md:w-24 h-1 mx-2 rounded transition-all ${step > s ? 'bg-primary-600' : 'bg-gray-200'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Personal Info</span>
                        <span>Test Details</span>
                        <span>Confirm</span>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="space-y-4 animate-slideInFromRight">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="Age"
                                        min="1"
                                        max="120"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Test Details */}
                    {step === 2 && (
                        <div className="space-y-4 animate-slideInFromRight">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address (optional for home collection)"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Test Package
                                </label>
                                <select
                                    name="testPackage"
                                    value={formData.testPackage}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                >
                                    <option value="">Select a test/package</option>
                                    <optgroup label="Health Packages">
                                        <option value="Swasth Fit SUPER 1">Swasth Fit SUPER 1 - ₹1,050</option>
                                        <option value="Swasth Fit SUPER 2">Swasth Fit SUPER 2 - ₹1,250</option>
                                        <option value="Swasth Fit SUPER 3">Swasth Fit SUPER 3 - ₹1,850</option>
                                        <option value="Swasth Fit SUPER 4">Swasth Fit SUPER 4 - ₹2,050</option>
                                        <option value="Swasth Fit COMPLETE">Swasth Fit COMPLETE - ₹5,000</option>
                                    </optgroup>
                                    <optgroup label="Individual Tests">
                                        <option value="Sugar Fasting">Sugar Fasting - ₹60</option>
                                        <option value="Random Sugar">Random Sugar - ₹60</option>
                                        <option value="Lipid Profile">Lipid Profile - ₹630</option>
                                        <option value="Thyroid Profile">Thyroid Profile - ₹550</option>
                                        <option value="Kidney Function Test">Kidney Function Test - ₹480</option>
                                        <option value="Liver Function Test">Liver Function Test - ₹550</option>
                                        <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC) - ₹200</option>
                                        <option value="Vitamin B12">Vitamin B12 - ₹1,200</option>
                                        <option value="Vitamin D (25 Hydroxy)">Vitamin D (25 Hydroxy) - ₹1,100</option>
                                        <option value="Urine R/M">Urine R/M - ₹80</option>
                                        <option value="Urine Culture">Urine Culture - ₹455</option>
                                        <option value="Pus Culture">Pus Culture - ₹960</option>
                                        <option value="Blood Group">Blood Group - ₹140</option>
                                        <option value="Viral Marker">Viral Marker - ₹950</option>
                                    </optgroup>
                                    <option value="Other">Other / Custom Request</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Preferred Time
                                    </label>
                                    <select
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Select time</option>
                                        <option value="7:00 AM - 9:00 AM">7:00 AM - 9:00 AM</option>
                                        <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                                        <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                                        <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                                        <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="animate-slideInFromRight">
                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <h3 className="font-bold text-gray-900 mb-3">Booking Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium">{formData.name || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="font-medium">{formData.phone || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Age/Gender:</span>
                                        <span className="font-medium">{formData.age} / {formData.gender || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Test Package:</span>
                                        <span className="font-medium">{formData.testPackage || 'Not selected'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Preferred Date:</span>
                                        <span className="font-medium">{formData.preferredDate || 'Flexible'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Preferred Time:</span>
                                        <span className="font-medium">{formData.preferredTime || 'Flexible'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                                <span className="text-3xl mb-2 block">💬</span>
                                <p className="text-green-800 font-medium">
                                    Click &quot;Confirm Booking&quot; to send your booking request via WhatsApp
                                </p>
                                <p className="text-green-600 text-sm mt-1">
                                    हमारी टीम जल्द ही आपसे संपर्क करेगी
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-gray-50 border-t flex gap-3">
                    {step > 1 && (
                        <button
                            onClick={handlePrevStep}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                        >
                            Back
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            onClick={handleNextStep}
                            disabled={step === 1 && (!formData.name || !formData.phone || !formData.age || !formData.gender)}
                            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Confirm Booking
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
