'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Tests', href: '/admin/tests', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { name: 'Bookings', href: '/admin/bookings', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Patients', href: '/admin/patients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
                    <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="px-4 mb-6">
                                <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-xl p-4 text-gray-900">
                                    <p className="text-sm opacity-80">Admin Panel</p>
                                    <p className="font-bold text-lg truncate">{user?.name || 'Admin'}</p>
                                </div>
                            </div>
                            <nav className="flex-1 px-2 space-y-1">
                                {adminNavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${isActive
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                        >
                                            <svg
                                                className={`mr-3 h-5 w-5 ${isActive ? 'text-secondary-400' : 'text-gray-400 group-hover:text-gray-300'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                            </svg>
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Mobile Nav */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
                    <nav className="flex justify-around py-2">
                        {adminNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex flex-col items-center px-3 py-2 text-xs ${isActive ? 'text-secondary-400' : 'text-gray-400'
                                        }`}
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span className="mt-1">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content */}
                <main className="md:pl-64 flex-1 pb-20 md:pb-0">
                    <div className="py-6 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
