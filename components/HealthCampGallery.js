'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

// Media items for the carousel
const mediaItems = [
    {
        type: 'image',
        src: '/camp.jpg',
        alt: 'Health Camp',
        caption: 'Free Health Checkup Camp',
    },
    {
        type: 'image',
        src: '/lalpath2.jpg',
        alt: 'Dr. Lal PathLabs',
        caption: 'Quality Diagnostics',
    },
    {
        type: 'video',
        src: '/lalpath3.mp4',
        alt: 'Health Camp Video',
        caption: 'Health Camp Highlights',
    },
    {
        type: 'image',
        src: '/lalpath4.jpg',
        alt: 'Community Health',
        caption: 'Community Health Initiative',
    },
];

export default function HealthCampGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomedMedia, setZoomedMedia] = useState(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-slide functionality
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    // Pause auto-slide when zoomed
    useEffect(() => {
        if (zoomedMedia) {
            setIsAutoPlaying(false);
        }
    }, [zoomedMedia]);

    // Close zoom on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setZoomedMedia(null);
                setIsAutoPlaying(true);
            }
        };
        if (zoomedMedia) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [zoomedMedia]);

    const currentMedia = mediaItems[currentIndex];

    return (
        <>
            {/* Zoom Modal / Lightbox */}
            {zoomedMedia && (
                <div
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => {
                        setZoomedMedia(null);
                        setIsAutoPlaying(true);
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => {
                            setZoomedMedia(null);
                            setIsAutoPlaying(true);
                        }}
                        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                        aria-label="Close zoom"
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Zoomed Media */}
                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {zoomedMedia.type === 'video' ? (
                            <video
                                src={zoomedMedia.src}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                            />
                        ) : (
                            <Image
                                src={zoomedMedia.src}
                                alt={zoomedMedia.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        )}
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white text-lg font-semibold">{zoomedMedia.caption}</p>
                        <p className="text-white/50 text-xs mt-2">Click anywhere or press ESC to close</p>
                    </div>
                </div>
            )}

            {/* Auto-sliding Carousel Section */}
            <section className="py-12 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container mx-auto px-4">
                    {/* Main Carousel */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Carousel Container */}
                        <div
                            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                            onClick={() => setZoomedMedia(currentMedia)}
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                        >
                            {/* Current Media */}
                            {currentMedia.type === 'video' ? (
                                <video
                                    key={currentIndex}
                                    src={currentMedia.src}
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                    muted
                                    autoPlay
                                    loop
                                    playsInline
                                />
                            ) : (
                                <Image
                                    key={currentIndex}
                                    src={currentMedia.src}
                                    alt={currentMedia.alt}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-105"
                                    priority
                                />
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                            {/* Zoom Icon on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-xl md:text-2xl font-bold mb-2">{currentMedia.caption}</p>
                                <p className="text-white/70 text-sm">Click to view full size</p>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevSlide();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                                aria-label="Previous slide"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextSlide();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                                aria-label="Next slide"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Auto-play indicator */}
                            {isAutoPlaying && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-white text-xs">Auto-playing</span>
                                </div>
                            )}
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-3 mt-6">
                            {mediaItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-primary-600 w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex justify-center gap-4 mt-6">
                            {mediaItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                                            ? 'ring-2 ring-primary-600 ring-offset-2 scale-105'
                                            : 'opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    {item.type === 'video' ? (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
