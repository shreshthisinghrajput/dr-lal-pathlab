export default function AboutPage() {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="hero-gradient text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Trusted pathology services with a commitment to accurate diagnostics and patient care
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
                                Shree Diagnostic
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Shree Diagnostic was established with a vision to provide affordable and accurate
                                diagnostic services to the people of Ambikapur and surrounding regions. Located
                                near Laxmipur School, Mathpara Chowk, we have grown to become one of the
                                most trusted pathology laboratories in the area.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Our state-of-the-art facility is equipped with modern diagnostic equipment
                                and staffed by experienced professionals who are dedicated to delivering
                                precise and timely results.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We believe that quality healthcare should be accessible to everyone, which
                                is why we offer our services at competitive prices without compromising on
                                quality or accuracy.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="w-full h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <svg className="w-24 h-24 text-primary-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <p className="text-primary-700 font-semibold">Diagnostic Center</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-secondary-400 text-gray-900 px-6 py-4 rounded-xl shadow-lg">
                                <p className="font-bold text-2xl">Since 2015</p>
                                <p className="text-sm">Serving the Community</p>
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
                                To provide accurate, reliable, and affordable diagnostic services
                                that empower patients and healthcare providers to make informed
                                decisions about health.
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
                                To be the most trusted and preferred diagnostic laboratory in the
                                region, known for excellence in quality, innovation, and patient care.
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
                                Integrity, accuracy, compassion, and commitment to continuous
                                improvement guide everything we do at Shree Diagnostic.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Owner Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-600 font-semibold mb-2 inline-block">Leadership</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Commitment</h2>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality Healthcare for All</h3>
                            <p className="text-primary-600 font-semibold mb-4">Trusted Since 2015</p>
                            <p className="text-gray-600 leading-relaxed">
                                Shree Diagnostic is committed to providing quality healthcare that is
                                accessible to all. Our vision is to be the most trusted diagnostic center
                                in the region, serving thousands of patients every year with accurate
                                and timely results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
