'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PopupModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup on first visit
        const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenPopup', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Close Button - Positioned inside content for mobile accessibility */}
                <div className="sticky top-0 z-20 flex justify-end p-3 bg-gradient-to-b from-white via-white to-transparent">
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 border border-gray-200"
                        aria-label="Close popup"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Header with Dr. Lal PathLabs Branding */}
                <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-4 text-center -mt-6">
                    <div className="flex items-center justify-center mb-2">
                        <span className="text-3xl mr-2">🏥</span>
                        <div>
                            <h2 className="text-xl font-bold">SHREEM Diagnostic</h2>
                            <p className="text-xs text-blue-200">श्रीम डायग्नोस्टिक</p>
                        </div>
                    </div>
                    <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold">Dr. Lal PathLabs Collection Center</span>
                        <span className="ml-2 bg-secondary-400 text-primary-800 px-2 py-0.5 rounded text-xs font-bold">CC-06</span>
                    </div>
                </div>

                {/* Content - Photo Only */}
                <div className="p-4">
                    {/* Center Image */}
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                        <Image
                            src="/lalpath1.png"
                            alt="SHREEM Diagnostic Center"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                            <p className="text-sm font-semibold">📍 Ambikapur, Chhattisgarh</p>
                        </div>
                    </div>

                    {/* Google Maps Location */}
                    <div className="rounded-xl overflow-hidden mb-4">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d552.0349289549843!2d83.18684002113703!3d23.101322412428313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1765543246021!5m2!1sen!2sin" 
                            width="100%" 
                            height="150" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-xl"
                        ></iframe>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="p-4 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-800 text-center">
                    <p className="font-bold text-base mb-2">Book Your Test Today! | आज ही जांच बुक करें!</p>
                    <a href="tel:9238745983" className="inline-flex items-center text-primary-800 font-bold text-lg hover:underline">
                        📞 +91 9238745983
                    </a>
                </div>
            </div>
        </div>
    );
}

