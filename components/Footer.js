import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white relative z-10">
            <div className="container mx-auto px-4 py-12">
                {/* Dr. Lal PathLabs Partnership Badge */}
                <div className="text-center mb-8 pb-8 border-b border-gray-800">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600/20 to-primary-700/20 px-6 py-3 rounded-full">
                        <span className="text-2xl">🏥</span>
                        <div>
                            <p className="font-bold text-white">Authorized Dr. Lal PathLabs Collection Center</p>
                            <p className="text-sm text-gray-400">अधिकृत डॉ. लाल पैथलैब्स कलेक्शन सेंटर | Center Code: CC-06</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Clinic Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center">
                                <span className="text-gray-900 font-bold text-lg">SD</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">SHREEM Diagnostic</h3>
                                <p className="text-xs text-gray-400">Your Health, Our Priority | आपका स्वास्थ्य, हमारी प्राथमिकता</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-2 max-w-md">
                            Get your health checked with us ✨
                        </p>
                        <p className="text-gray-400 mb-4 max-w-md">
                            SHREEM Diagnostic is an authorized Dr. Lal PathLabs collection center providing accurate and timely diagnostic services. We are committed to delivering quality healthcare with compassion.
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            श्रीं डायग्नोस्टिक एक अधिकृत डॉ. लाल पैथलैब्स कलेक्शन सेंटर है जो सटीक और समय पर डायग्नोस्टिक सेवाएं प्रदान करता है।
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/share/1AYLYWiQAx/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/shreemdiagnostic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary-400">Quick Links | त्वरित लिंक</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home | होम
                                </Link>
                            </li>
                            <li>
                                <Link href="/tests" className="text-gray-400 hover:text-white transition-colors">
                                    Tests | जांच
                                </Link>
                            </li>
                            <li>
                                <Link href="/offers" className="text-gray-400 hover:text-white transition-colors">
                                    Offers | ऑफर्स
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us | हमारे बारे में
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact | संपर्क
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-secondary-400">Contact Info | संपर्क जानकारी</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start space-x-2">
                                <svg className="w-5 h-5 mt-0.5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Infront of Laxmipur School, Bilaspur Road, Mathpara, Ambikapur, Chhattisgarh<br />लक्ष्मीपुर स्कूल के सामने, बिलासपुर रोड, मठपारा, अंबिकापुर</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:9238745983" className="hover:text-white transition-colors">+91 9238745983</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:shreemdiagnostic@gmail.com" className="hover:text-white transition-colors">shreemdiagnostic@gmail.com</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Mon - Sat: 9:00 AM - 11:00 AM & 5:00 PM - 9:00 PM<br />Sun: 8:00 AM - 2:00 PM<br />सोम - शनि: सुबह 9 - 11 & शाम 5 - 9 | रवि: सुबह 8 - दोपहर 2</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SHREEM Diagnostic - Authorized Dr. Lal PathLabs Collection Center (CC-06). All rights reserved.</p>
                    <p className="mt-2 text-sm">Infront of Laxmipur School, Bilaspur Road, Mathpara, Ambikapur | लक्ष्मीपुर स्कूल के सामने, बिलासपुर रोड, मठपारा, अंबिकापुर</p>
                </div>
            </div>
        </footer>
    );
}

