'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="sticky top-0 z-50">
            {/* Dr. Lal PathLabs Partnership Banner */}
            <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white py-2 px-4">
                <div className="container mx-auto flex justify-center items-center text-sm">
                    <div className="flex items-center space-x-3">
                        <span className="animate-pulse">🏥</span>
                        <span className="font-bold">
                            Authorized Dr. Lal PathLabs Collection Center | अधिकृत डॉ. लाल पैथलैब्स कलेक्शन सेंटर
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">
                            CC-06
                        </span>
                    </div>
                </div>
            </div>

            {/* Top Yellow Bar */}
            <div className="bg-secondary-500 text-primary-800 py-2 px-4">
                <div className="container mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +91 9238745983
                        </span>
                        <span className="hidden sm:flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Mon-Sat: 9AM-11AM & 5PM-9PM | सोम-शनि: 9-11 & 5-9
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="hidden sm:block">Trusted by Dr. Lal PathLabs | विश्वसनीय डायग्नोस्टिक्स</span>
                        <span className="font-semibold">📍 Ambikapur</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="flex flex-col items-start">
                                <Image
                                    src="/logo.png"
                                    alt="Dr Lal PathLabs"
                                    width={140}
                                    height={45}
                                    className="h-10 w-auto"
                                    priority
                                />
                                <span className="text-xl md:text-2xl font-bold text-primary-700 tracking-tight">SHREEM Diagnostic</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                Home
                            </Link>
                            <Link href="/tests" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                Tests
                            </Link>
                            <Link href="/offers" className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center">
                                <span className="mr-1">🏕️</span> Health Camp
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                Contact
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href={isAdmin ? '/admin' : '/patient'}
                                        className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <span className="text-gray-500">|</span>
                                    <span className="text-gray-600">{user?.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-4 py-2 bg-secondary-500 text-primary-800 rounded-lg hover:bg-secondary-600 transition-colors font-semibold shadow-md"
                                    >
                                        Book a Test
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
                            <div className="flex flex-col space-y-4 pt-4">
                                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                    Home
                                </Link>
                                <Link href="/tests" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                    Tests
                                </Link>
                                <Link href="/offers" className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center">
                                    <span className="mr-1">🏕️</span> Health Camp
                                </Link>
                                <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                    About Us
                                </Link>
                                <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                    Contact
                                </Link>
                                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                                    {isAuthenticated ? (
                                        <>
                                            <Link
                                                href={isAdmin ? '/admin' : '/patient'}
                                                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="px-4 py-2 text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium text-center"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="px-4 py-2 text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium text-center"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="px-4 py-2 bg-secondary-500 text-primary-800 rounded-lg hover:bg-secondary-600 transition-colors font-semibold text-center"
                                            >
                                                Book a Test
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

