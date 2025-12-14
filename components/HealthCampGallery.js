'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Fallback images for when no camps exist
const fallbackImages = [
    {
        src: '/camp.jpg',
        alt: 'SHREEM Diagnostic Health Camp',
        caption: 'Free Health Checkup Camp',
    },
];

export default function HealthCampGallery() {
    const scrollRef = useRef(null);
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCamps();
    }, []);

    const fetchCamps = async () => {
        try {
            const response = await fetch('/api/camps?active=true');
            const data = await response.json();
            if (data.success && data.data.length > 0) {
                setCamps(data.data);
            }
        } catch (error) {
            console.error('Error fetching camps:', error);
        } finally {
            setLoading(false);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Build gallery items from camps or use fallback
    const galleryItems = camps.length > 0
        ? camps.flatMap(camp =>
            camp.media && camp.media.length > 0
                ? camp.media.map((media, idx) => ({
                    ...media,
                    campName: camp.name,
                    caption: media.caption || camp.name,
                }))
                : [{
                    type: 'image',
                    url: '/camp.jpg',
                    campName: camp.name,
                    caption: camp.name,
                }]
        )
        : fallbackImages.map(img => ({
            type: 'image',
            url: img.src,
            campName: 'SHREEM Diagnostic',
            caption: img.caption,
        }));

    return (
        <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <span className="text-primary-600 font-semibold mb-2 inline-block">Community Initiative</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Health Camp | स्वास्थ्य शिविर
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Free health checkup camps for the community
                    </p>
                </div>

                {/* Gallery Container */}
                <div className="relative">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 -ml-2 md:ml-0"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 -mr-2 md:mr-0"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scrollable Gallery */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto health-camp-gallery px-4 py-4"
                    >
                        {loading ? (
                            // Loading skeleton
                            [...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden shadow-lg bg-white"
                                >
                                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            galleryItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden shadow-lg bg-white card-hover"
                                >
                                    <div className="relative w-full h-48">
                                        {item.type === 'video' ? (
                                            <video
                                                src={item.url}
                                                className="w-full h-full object-cover"
                                                controls
                                                muted
                                            />
                                        ) : (
                                            <Image
                                                src={item.url}
                                                alt={item.caption || 'Health Camp'}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <p className="text-white font-semibold text-sm">{item.caption}</p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <span className="mr-1">🏥</span>
                                            <span>{item.campName || 'SHREEM Diagnostic'}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Free health services for the community
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* View All Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/offers"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium shadow-md"
                    >
                        View All Health Camps
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

