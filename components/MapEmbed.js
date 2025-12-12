export default function MapEmbed({ showDirectionsButton = true, height = 'h-80' }) {
    // Shree Diagnostic Center - Near Laxmipur School, Mathpara Chowk, Ambikapur
    const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.123!2d83.186!3d23.1015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzA1LjQiTiA4M8KwMTEnMDkuNiJF!5e0!3m2!1sen!2sin!4v1702300000000!5m2!1sen!2sin';
    const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Shree+Diagnostic+Center+Mathpara+Chowk+Ambikapur';

    return (
        <div className="w-full">
            <div className={`relative ${height} md:h-96 w-full rounded-2xl overflow-hidden shadow-lg`}>
                <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Shree Diagnostic Center Location"
                    className="absolute inset-0"
                />
                {/* Location Pin Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative animate-bounce">
                        <svg className="w-12 h-12 text-red-600 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 6.38 8.5 15.5 8.5 15.5s8.5-9.12 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 12c-1.93 0-3.5-1.57-3.5-3.5S10.07 5 12 5s3.5 1.57 3.5 3.5S13.93 12 12 12z" />
                        </svg>
                    </div>
                </div>
            </div>

            {showDirectionsButton && (
                <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Get Directions
                    </a>
                    <a
                        href="tel:9238745983"
                        className="inline-flex items-center px-6 py-3 bg-secondary-500 text-primary-800 rounded-lg hover:bg-secondary-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call: 9238745983
                    </a>
                </div>
            )}
        </div>
    );
}

