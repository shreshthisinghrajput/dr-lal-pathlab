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
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    aria-label="Close popup"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header with Dr. Lal PathLabs Branding */}
                <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-4xl mr-3">🏥</span>
                        <div>
                            <h2 className="text-2xl font-bold">SHREEM Diagnostic</h2>
                            <p className="text-sm text-blue-200">श्रीम डायग्नोस्टिक</p>
                        </div>
                    </div>
                    <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                        <span className="text-sm font-semibold">Authorized Dr. Lal PathLabs Collection Center</span>
                        <span className="ml-2 bg-secondary-400 text-primary-800 px-2 py-0.5 rounded text-xs font-bold">CC-06</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Instagram Bio Line */}
                    <div className="text-center mb-4">
                        <p className="text-xl font-bold text-gray-800 mb-1">Get ur health checked with us ✨</p>
                        <p className="text-lg text-primary-600 font-semibold">हमारे साथ अपनी सेहत की जांच कराएं</p>
                    </div>

                    {/* Center Image */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                        <Image
                            src="/lalpath1.png"
                            alt="SHREEM Diagnostic Center"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 text-white">
                            <p className="font-semibold">📍 Ambikapur, Chhattisgarh</p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <span className="text-xl">✅</span>
                            <span className="text-sm font-medium">Accurate Results<br /><span className="text-gray-500 text-xs">सटीक परिणाम</span></span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <span className="text-xl">⚡</span>
                            <span className="text-sm font-medium">Quick Reports<br /><span className="text-gray-500 text-xs">तेज़ रिपोर्ट</span></span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <span className="text-xl">💰</span>
                            <span className="text-sm font-medium">Affordable<br /><span className="text-gray-500 text-xs">किफायती</span></span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <span className="text-xl">🔬</span>
                            <span className="text-sm font-medium">50+ Tests<br /><span className="text-gray-500 text-xs">50+ जांच</span></span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-800 text-center">
                    <p className="font-bold text-lg mb-1">Book Your Test Today! | आज ही जांच बुक करें!</p>
                    <a href="tel:9238745983" className="inline-flex items-center text-primary-800 font-bold text-xl hover:underline">
                        📞 +91 9238745983
                    </a>
                </div>
            </div>
        </div>
    );
}

