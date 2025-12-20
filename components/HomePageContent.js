'use client';

import { useState } from 'react';
import Link from 'next/link';
import DoctorsSection from '@/components/DoctorsSection';
import TestPackagesSection from '@/components/TestPackagesSection';
import HealthCampGallery from '@/components/HealthCampGallery';
import BookingModal from '@/components/BookingModal';

export default function HomePageContent() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');

    const handleBookNow = (packageName) => {
        setSelectedPackage(packageName || '');
        setIsBookingOpen(true);
    };

    return (
        <>
            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                packageName={selectedPackage}
            />

            {/* Hero Section */}
            <section className="hero-gradient text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            {/* Dr. Lal PathLabs Badge */}
                            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-4">
                                <span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 animate-pulse"></span>
                                <span className="text-sm font-semibold">Authorized Dr. Lal PathLabs Collection Center | CC-06</span>
                            </div>
                            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6 ml-0 md:ml-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                <span className="text-sm">Trusted by 10,000+ Patients | 10,000+ मरीजों द्वारा भरोसेमंद</span>
                            </div>
                            <div className="inline-flex items-center px-4 py-2 bg-green-500/30 rounded-full mb-6 ml-0 md:ml-2">
                                <span className="text-lg mr-2">🏠</span>
                                <span className="text-sm font-semibold">We provide FREE Home Collection | निशुल्क होम कलेक्शन उपलब्ध</span>
                            </div>

                            {/* Main Heading - SHREEM Diagnostic */}
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-2 leading-tight">
                                <span className="text-secondary-400">SHREEM</span> Diagnostic
                            </h1>
                            <p className="text-2xl md:text-3xl font-bold text-blue-100 mb-4">
                                श्रीं डायग्नोस्टिक
                            </p>
                            <p className="text-xl md:text-2xl text-white/90 mb-2">
                                Get your health checked with us ✨
                            </p>
                            <p className="text-lg text-blue-200 mb-8 max-w-lg">
                                Your trusted diagnostic partner powered by Dr. Lal PathLabs quality standards.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/tests" className="btn-secondary inline-flex items-center">
                                    <span>View All Tests</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <button
                                    onClick={() => handleBookNow('')}
                                    className="px-6 py-3 bg-secondary-400 text-gray-900 rounded-lg hover:bg-secondary-300 transition-all duration-300 font-semibold shadow-lg"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block relative">
                            {/* Beautiful animated medical-themed background */}
                            <div className="relative w-full h-80 lg:h-96">
                                {/* Main circular gradient */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-white/20 to-secondary-400/30 rounded-full animate-pulse"></div>
                                </div>

                                {/* Floating medical icons */}
                                <div className="absolute top-8 right-8 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-bounce" style={{ animationDelay: '0s' }}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>

                                <div className="absolute bottom-12 left-4 w-14 h-14 bg-secondary-400/40 rounded-xl flex items-center justify-center backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.2s' }}>
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>

                                <div className="absolute top-20 left-12 w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.4s' }}>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>

                                <div className="absolute bottom-8 right-12 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.6s' }}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>

                                {/* Center lab icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-white/25 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md">
                                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Decorative circles */}
                                <div className="absolute top-4 left-1/2 w-4 h-4 bg-secondary-400/60 rounded-full animate-ping"></div>
                                <div className="absolute bottom-20 right-4 w-3 h-3 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                <div className="absolute top-1/2 right-0 w-2 h-2 bg-secondary-300/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-8 shadow-md relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '10,000+', label: 'Happy Patients' },
                            { number: '50+', label: 'Tests Available' },
                            { number: '99%', label: 'Accuracy Rate' },
                            { number: '24hrs', label: 'Report Delivery' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary-600">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Health Packages Section */}
            <TestPackagesSection onBookNow={handleBookNow} />

            {/* Health Camp Gallery */}
            <HealthCampGallery />

            {/* Individual Tests Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Individual Tests</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Test Menu</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Book individual diagnostic tests at affordable prices
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                            { name: 'Sugar Fasting', price: 60, icon: '🩸' },
                            { name: 'Random Sugar', price: 60, icon: '🩸' },
                            { name: 'Lipid Profile', price: 630, icon: '❤️' },
                            { name: 'Thyroid Profile', price: 550, icon: '🦋' },
                            { name: 'Kidney Function Test', price: 480, icon: '💪' },
                            { name: 'Liver Function Test', price: 550, icon: '🫁' },
                            { name: 'Complete Blood Count (CBC)', price: 200, icon: '🩸' },
                            { name: 'Vitamin B12', price: 1200, icon: '💊' },
                            { name: 'Vitamin D (25 Hydroxy)', price: 1100, icon: '☀️' },
                            { name: 'Urine R/M', price: 80, icon: '🧪' },
                            { name: 'Urine Culture', price: 455, icon: '🧫' },
                            { name: 'Pus Culture', price: 960, icon: '🧫' },
                            { name: 'Blood Group', price: 140, icon: '🅰️' },
                            { name: 'Viral Marker', price: 950, icon: '🦠' },
                        ].map((test, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl">{test.icon}</span>
                                    <span className="text-xl font-bold text-primary-600">₹{test.price}</span>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2">{test.name}</h3>
                                <button
                                    onClick={() => handleBookNow(test.name)}
                                    className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pediatric Doctors Section */}
            <DoctorsSection />

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Testing Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Get your diagnostic tests done in just 4 simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Book Online', desc: 'Choose your test and book an appointment online', icon: '📱' },
                            { step: '02', title: 'Visit Center', desc: 'Come to Shree Diagnostic at your scheduled time', icon: '🏥' },
                            { step: '03', title: 'Sample Collection', desc: 'Our trained staff will collect your sample', icon: '🧪' },
                            { step: '04', title: 'Get Reports', desc: 'Download your reports online within 24 hours', icon: '📋' },
                        ].map((item, index) => (
                            <div key={index} className="text-center relative">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-3xl">{item.icon}</span>
                                </div>
                                <div className="text-primary-600 font-bold text-sm mb-2">STEP {item.step}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-primary-200"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Shree Diagnostic</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Accurate Results', desc: 'State-of-the-art equipment ensuring 99% accuracy in all tests', icon: '🎯' },
                            { title: 'Quick Reports', desc: 'Get your test reports within 24 hours of sample collection', icon: '⚡' },
                            { title: 'Expert Team', desc: 'Highly qualified pathologists and experienced technicians', icon: '👨‍⚕️' },
                            { title: 'Affordable Pricing', desc: 'Quality healthcare at prices that won\'t burden your pocket', icon: '💰' },
                            { title: 'Hygienic Environment', desc: 'Clean and sanitized facility following all safety protocols', icon: '✨' },
                            { title: 'Online Booking', desc: 'Easy online booking and report download from anywhere', icon: '💻' },
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-8 card-hover">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-secondary-400 font-semibold mb-2 inline-block">Testimonials</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Rajesh Kumar', review: 'Excellent service and accurate results. The staff is very professional and the reports come on time.', rating: 5 },
                            { name: 'Priya Sharma', review: 'Very clean facility and friendly staff. Dr. Singh is very knowledgeable. Highly recommend!', rating: 5 },
                            { name: 'Amit Patel', review: 'Best pathology lab in Ambikapur. Affordable prices and quick service. Very satisfied.', rating: 5 },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-8">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6">&quot;{testimonial.review}&quot;</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-gray-400 text-sm">Verified Patient</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 hero-gradient text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Test?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Take the first step towards better health. Book your diagnostic test today.
                    </p>
                    <button
                        onClick={() => handleBookNow('')}
                        className="px-8 py-4 bg-secondary-400 text-gray-900 rounded-lg hover:bg-secondary-300 transition-all duration-300 font-bold text-lg shadow-lg inline-block"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>
        </>
    );
}
