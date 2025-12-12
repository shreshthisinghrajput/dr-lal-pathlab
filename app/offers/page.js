import Image from 'next/image';
import Link from 'next/link';

export default function OffersPage() {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="hero-gradient text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-4">
                        <span className="text-2xl mr-2">🎁</span>
                        <span className="font-semibold">Special Offers & Health Camps</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Offers & Health Camps
                    </h1>
                    <p className="text-xl text-blue-100 mb-2">
                        ऑफर्स और स्वास्थ्य शिविर
                    </p>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Special offers and community health initiatives from SHREEM Diagnostic - Authorized Dr. Lal PathLabs Collection Center
                    </p>
                </div>
            </section>

            {/* Dr. Lal PathLabs Partnership Banner */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center space-x-4 text-white">
                        <span className="text-2xl">🏥</span>
                        <div className="text-center">
                            <p className="font-bold">Authorized Dr. Lal PathLabs Collection Center | CC-06</p>
                            <p className="text-sm text-blue-200">अधिकृत डॉ. लाल पैथलैब्स कलेक्शन सेंटर</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Medical Camp Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Community Initiative | सामुदायिक पहल</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Health Camp | स्वास्थ्य शिविर
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We organized a free health checkup camp for the community to spread awareness about preventive healthcare.
                        </p>
                        <p className="text-gray-500 mt-2">
                            समुदाय में निवारक स्वास्थ्य देखभाल के बारे में जागरूकता फैलाने के लिए हमने मुफ्त स्वास्थ्य जांच शिविर का आयोजन किया।
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Camp Image */}
                        <div className="relative">
                            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/camp.jpg"
                                    alt="SHREEM Diagnostic Health Camp"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-800 px-6 py-4 rounded-xl shadow-lg">
                                <p className="font-bold text-lg">Free Health Camp</p>
                                <p className="text-sm">मुफ्त स्वास्थ्य शिविर</p>
                            </div>
                        </div>

                        {/* Camp Details */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Medical Camp by SHREEM Diagnostic
                            </h3>
                            <p className="text-lg text-primary-600 font-semibold mb-4">
                                श्रीम डायग्नोस्टिक द्वारा मेडिकल कैंप
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Free Blood Sugar Test</p>
                                        <p className="text-gray-600">मुफ्त ब्लड शुगर जांच</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Free Blood Pressure Check</p>
                                        <p className="text-gray-600">मुफ्त ब्लड प्रेशर जांच</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Free Health Consultation</p>
                                        <p className="text-gray-600">मुफ्त स्वास्थ्य परामर्श</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Health Awareness Session</p>
                                        <p className="text-gray-600">स्वास्थ्य जागरूकता सत्र</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-gray-700 mb-4">
                                    As an authorized Dr. Lal PathLabs collection center, we are committed to community health.
                                    Our medical camps bring quality healthcare closer to the people of Ambikapur.
                                </p>
                                <p className="text-gray-600 text-sm">
                                    अधिकृत डॉ. लाल पैथलैब्स कलेक्शन सेंटर के रूप में, हम समुदाय के स्वास्थ्य के लिए प्रतिबद्ध हैं।
                                    हमारे मेडिकल कैंप अंबिकापुर के लोगों के करीब गुणवत्तापूर्ण स्वास्थ्य सेवा लाते हैं।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Offers Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Special Offers | विशेष ऑफर</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Current Offers
                        </h2>
                        <p className="text-gray-600">चालू ऑफर्स</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Offer 1 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 text-center">
                                <span className="text-3xl">🩸</span>
                                <h3 className="text-xl font-bold mt-2">Complete Blood Count</h3>
                                <p className="text-blue-200 text-sm">पूर्ण रक्त गणना</p>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-gray-400 line-through text-lg">₹500</span>
                                    <span className="text-3xl font-bold text-primary-600 ml-2">₹350</span>
                                </div>
                                <ul className="space-y-2 text-gray-600 mb-4">
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Hemoglobin
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> WBC Count
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Platelet Count
                                    </li>
                                </ul>
                                <Link href="/tests" className="block w-full text-center btn-primary">
                                    Book Now | अभी बुक करें
                                </Link>
                            </div>
                        </div>

                        {/* Offer 2 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border-2 border-secondary-400">
                            <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-800 p-4 text-center">
                                <span className="text-3xl">🔬</span>
                                <h3 className="text-xl font-bold mt-2">Full Body Checkup</h3>
                                <p className="text-primary-700 text-sm">पूर्ण शारीरिक जांच</p>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-gray-400 line-through text-lg">₹3000</span>
                                    <span className="text-3xl font-bold text-primary-600 ml-2">₹1999</span>
                                </div>
                                <ul className="space-y-2 text-gray-600 mb-4">
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Complete Blood Count
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Liver Function Test
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Kidney Function Test
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Thyroid Profile
                                    </li>
                                </ul>
                                <Link href="/tests" className="block w-full text-center bg-secondary-400 text-primary-800 font-bold py-3 rounded-lg hover:bg-secondary-500 transition-colors">
                                    Book Now | अभी बुक करें
                                </Link>
                            </div>
                        </div>

                        {/* Offer 3 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 text-center">
                                <span className="text-3xl">💉</span>
                                <h3 className="text-xl font-bold mt-2">Diabetes Panel</h3>
                                <p className="text-blue-200 text-sm">मधुमेह पैनल</p>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-gray-400 line-through text-lg">₹1000</span>
                                    <span className="text-3xl font-bold text-primary-600 ml-2">₹750</span>
                                </div>
                                <ul className="space-y-2 text-gray-600 mb-4">
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Fasting Blood Sugar
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> Post Prandial Sugar
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✓</span> HbA1c
                                    </li>
                                </ul>
                                <Link href="/tests" className="block w-full text-center btn-primary">
                                    Book Now | अभी बुक करें
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Swasth Fit Packages */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-4">
                            <span className="text-xl mr-2">🏥</span>
                            <span className="text-primary-700 font-semibold">Powered by Dr. Lal PathLabs</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Swasth Fit Packages
                        </h2>
                        <p className="text-gray-600">स्वस्थ फिट पैकेज - Dr. Lal PathLabs द्वारा संचालित</p>
                        <p className="text-gray-500 max-w-2xl mx-auto mt-4">
                            Premium health packages from Dr. Lal PathLabs available at SHREEM Diagnostic Center
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Swasth Fit Basic</h3>
                            <p className="text-primary-600 font-semibold mb-4">स्वस्थ फिट बेसिक</p>
                            <ul className="space-y-2 text-gray-600 mb-6">
                                <li>✓ Complete Blood Count</li>
                                <li>✓ Blood Sugar Fasting</li>
                                <li>✓ Lipid Profile</li>
                                <li>✓ Liver Function Test</li>
                            </ul>
                            <Link href="/tests" className="block w-full text-center btn-primary">
                                View Details | विवरण देखें
                            </Link>
                        </div>

                        <div className="bg-gradient-to-br from-secondary-50 to-yellow-50 rounded-2xl p-8 border border-secondary-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Swasth Fit Advanced</h3>
                            <p className="text-primary-600 font-semibold mb-4">स्वस्थ फिट एडवांस्ड</p>
                            <ul className="space-y-2 text-gray-600 mb-6">
                                <li>✓ Complete Blood Count</li>
                                <li>✓ Thyroid Profile</li>
                                <li>✓ Kidney Function Test</li>
                                <li>✓ Vitamin D & B12</li>
                            </ul>
                            <Link href="/tests" className="block w-full text-center bg-secondary-400 text-primary-800 font-bold py-3 rounded-lg hover:bg-secondary-500 transition-colors">
                                View Details | विवरण देखें
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 hero-gradient text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Book Your Test Today!
                    </h2>
                    <p className="text-xl text-blue-100 mb-2">आज ही अपनी जांच बुक करें!</p>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        Contact us for more information about our offers and health camps.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="tel:9238745983" className="px-8 py-4 bg-secondary-400 text-gray-900 rounded-lg hover:bg-secondary-300 transition-all duration-300 font-bold text-lg shadow-lg inline-flex items-center">
                            📞 +91 9238745983
                        </a>
                        <a href="mailto:shreemdiagnostic@gmail.com" className="px-8 py-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-bold text-lg shadow-lg inline-flex items-center">
                            ✉️ shreemdiagnostic@gmail.com
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
