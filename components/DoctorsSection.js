'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const doctors = [
    {
        id: 1,
        name: 'Dr. Atul Sahu',
        qualification: 'MBBS, MD (Pediatrics)',
        specialty: 'Pediatrician',
        timing: '9:00 AM - 11:00 AM',
        timingLabel: 'Morning',
        image: '/dr-atul.jpg', // Dr. Atul's image
        description: `Dr. Atul Sahu is a highly qualified Pediatrician, holding an MBBS and an MD in Pediatrics from CIMS Bilaspur, Chhattisgarh, specializing in the care of children.`,
        location: 'Shree Diagnostic Center, Near Laxmipur School, Mathpara Chowk, Ambikapur',
        treatments: [
            'Fever, Jaundice, Typhoid',
            'Malnutrition',
            'Growth & Developmental Delays',
            'Delayed Speech',
            'Bedwetting',
            'Anemia',
            'Excessive Obesity',
            'Seizures'
        ]
    },
    {
        id: 2,
        name: 'Dr. Sameeksha Pandey',
        qualification: 'MBBS, DPNB (Pediatrics)',
        specialty: 'Neonatology & Child Diseases',
        timing: '5:00 PM - 8:00 PM',
        timingLabel: 'Evening',
        image: '/dr-sameeksha.png',
        description: `Dr. Samiksha Pandey is an expert in Neonatology and Child Diseases, with training from BLK-Max Hospital New Delhi and prior experience at institutions like Motilal Nehru Medical College, Prayagraj.`,
        location: 'Shree Diagnostic Center, Near Laxmipur School, Mathpara Chowk, Ambikapur',
        treatments: [
            'Fever, Jaundice, Typhoid',
            'Nutritional Issues',
            'Malnutrition & Anemia',
            'Delayed Speech',
            'Growth Problems (Failure to Thrive)',
            'Bedwetting',
            'Seizures',
            'Weight Management'
        ]
    }
];

function DoctorCard({ doctor, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-1000 ease-out ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            style={{ transitionDelay: `${index * 200}ms` }}
        >
            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden`}>
                {/* Image Section */}
                <div className="w-full lg:w-2/5 relative group overflow-hidden">
                    {doctor.image ? (
                        <div className="relative h-80 lg:h-full lg:min-h-[450px] overflow-hidden">
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                fill
                                className="object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ) : (
                        <div className="h-80 lg:min-h-[450px] bg-gradient-to-br from-primary-100 to-primary-200 flex flex-col items-center justify-center">
                            <div className="w-32 h-32 bg-primary-300 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-20 h-20 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <p className="text-primary-600 font-medium">Photo Coming Soon</p>
                        </div>
                    )}
                    {/* Timing Badge */}
                    <div className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'} px-4 py-2 rounded-full shadow-lg ${doctor.timingLabel === 'Morning'
                        ? 'bg-secondary-500 text-primary-800'
                        : 'bg-primary-600 text-white'
                        }`}>
                        <span className="font-semibold">{doctor.timingLabel}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-3/5 p-8">
                    <div className="mb-4">
                        <span className="text-sm font-medium text-secondary-600 uppercase tracking-wider">{doctor.specialty}</span>
                        <h3 className="text-3xl font-bold text-primary-700 mt-1">{doctor.name}</h3>
                        <p className="text-gray-600 font-medium">{doctor.qualification}</p>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{doctor.description}</p>

                    {/* Timing */}
                    <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Consultation Hours</p>
                            <p className="text-xl font-bold text-primary-700">{doctor.timing}</p>
                        </div>
                    </div>

                    {/* Treatments */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Specialized Treatments:</h4>
                        <div className="flex flex-wrap gap-2">
                            {doctor.treatments.map((treatment, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                                >
                                    {treatment}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start text-gray-600">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{doctor.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DoctorsSection() {
    return (
        <section className="py-20 bg-gray-50" id="doctors">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-secondary-600 font-semibold text-sm uppercase tracking-wider">Expert Care</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mt-2 mb-4">
                        Meet Our Doctors
                    </h2>
                    <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Our experienced pediatric specialists are dedicated to providing comprehensive healthcare for your children
                    </p>
                </div>

                {/* Doctors List */}
                <div className="space-y-16">
                    {doctors.map((doctor, index) => (
                        <DoctorCard key={doctor.id} doctor={doctor} index={index} />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Book an Appointment</h3>
                        <p className="text-gray-600 mb-6">Schedule a consultation with our pediatric specialists</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:9238745983"
                                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Now
                            </a>
                            <a
                                href="/contact"
                                className="px-6 py-3 bg-secondary-500 text-primary-800 rounded-lg hover:bg-secondary-600 transition-colors font-semibold"
                            >
                                Visit Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
