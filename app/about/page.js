import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="hero-gradient text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-4">
                        <span className="text-2xl mr-2">🏥</span>
                        <span className="font-semibold">Authorized Dr. Lal PathLabs Collection Center</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Your trusted Dr. Lal PathLabs franchise partner in Ambikapur, Chhattisgarh
                    </p>
                </div>
            </section>

            {/* Clinic Intro */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary-600 font-semibold mb-2 inline-block">Our Story</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                SHREEM Diagnostic
                            </h2>
                            <div className="inline-flex items-center bg-primary-100 px-4 py-2 rounded-full mb-6">
                                <span className="text-primary-700 font-semibold text-sm">Official Dr. Lal PathLabs Franchise | CC-06</span>
                            </div>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                <strong>SHREEM Diagnostic</strong> is an authorized franchise of <strong>Dr. Lal PathLabs</strong>,
                                India&apos;s leading and most trusted diagnostic healthcare company. Established in <strong>2025</strong>,
                                we bring world-class diagnostic services to the people of Ambikapur and surrounding regions.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                As an official collection center (CC-06), we maintain the same rigorous quality standards
                                that have made Dr. Lal PathLabs a household name in healthcare diagnostics across India for
                                over 75 years.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Located near Laxmipur School, Mathpara Chowk, our state-of-the-art facility is equipped
                                with modern diagnostic equipment and staffed by experienced professionals dedicated to
                                delivering precise and timely results.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/dr-lal-founder.png"
                                    alt="Dr. Lal PathLabs - 75+ Years of Trust"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-secondary-400 text-gray-900 px-6 py-4 rounded-xl shadow-lg">
                                <p className="font-bold text-2xl">Since 2025</p>
                                <p className="text-sm">Dr. Lal PathLabs Franchise</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dr. Lal PathLabs Info */}
            <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-secondary-400 font-semibold mb-2 inline-block">Our Parent Company</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Dr. Lal PathLabs</h2>
                        <p className="text-blue-100 max-w-3xl mx-auto">
                            India&apos;s largest and most trusted diagnostic healthcare company
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-secondary-400 mb-2">75+</div>
                            <p className="text-blue-100">Years of Excellence</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-secondary-400 mb-2">270+</div>
                            <p className="text-blue-100">Clinical Labs</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-secondary-400 mb-2">4000+</div>
                            <p className="text-blue-100">Collection Centers</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-secondary-400 mb-2">₹7000 Cr</div>
                            <p className="text-blue-100">Market Value</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-secondary-400">Legacy & History</h3>
                                <p className="text-blue-100 mb-4">
                                    Dr. Lal PathLabs was founded in 1949 by Dr. S.K. Lal in Delhi. What started as a
                                    small clinical laboratory has grown into India&apos;s largest diagnostic chain with a
                                    presence across the nation.
                                </p>
                                <p className="text-blue-100">
                                    The company is listed on both BSE and NSE, reflecting its strong market position
                                    and investor confidence. Dr. Lal PathLabs processes over 60 million samples annually.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-secondary-400">Quality & Accreditations</h3>
                                <ul className="space-y-3 text-blue-100">
                                    <li className="flex items-start">
                                        <span className="mr-2">✅</span>
                                        <span><strong>NABL Accredited</strong> - National Accreditation Board for Testing and Calibration Laboratories</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✅</span>
                                        <span><strong>CAP Accredited</strong> - College of American Pathologists</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✅</span>
                                        <span><strong>ISO Certified</strong> - International quality management standards</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✅</span>
                                        <span><strong>1500+ Tests</strong> - Comprehensive diagnostic portfolio</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">What We Stand For</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mission & Values</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-gray-50 rounded-2xl">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600">
                                To bring Dr. Lal PathLabs&apos; world-class diagnostic services to Ambikapur,
                                making quality healthcare accessible and affordable for all.
                            </p>
                        </div>

                        <div className="text-center p-8 bg-gray-50 rounded-2xl">
                            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600">
                                To be the most trusted diagnostic center in the region, known for excellence
                                in quality, accuracy, and patient care.
                            </p>
                        </div>

                        <div className="text-center p-8 bg-gray-50 rounded-2xl">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
                            <p className="text-gray-600">
                                Accuracy, integrity, compassion, and commitment to continuous improvement
                                guide everything we do at SHREEM Diagnostic.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Owner Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Franchise Partner</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Commitment</h2>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality Healthcare for All</h3>
                            <div className="inline-flex items-center bg-secondary-100 px-4 py-2 rounded-full mb-4">
                                <span className="text-primary-700 font-semibold">Established 2025 | Dr. Lal PathLabs Franchise</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                SHREEM Diagnostic is committed to providing quality healthcare that is
                                accessible to all. As an authorized Dr. Lal PathLabs franchise, we ensure that
                                every test conducted meets the highest standards of accuracy and reliability.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our vision is to be the most trusted diagnostic center in the region,
                                serving thousands of patients every year with accurate and timely results
                                backed by Dr. Lal PathLabs&apos; 75+ years of experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

