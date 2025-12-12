import Link from 'next/link';

export default function TestCard({ test, showBookButton = true }) {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-secondary-400 text-gray-900 text-sm font-semibold rounded-full">
                        {test.category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {test.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {test.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span>{test.sampleType}</span>
                    </div>
                    <div className="text-xl font-bold text-primary-600">
                        ₹{test.price}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Link
                        href={`/tests/${test._id}`}
                        className="flex-1 px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-center font-medium"
                    >
                        View Details
                    </Link>
                    {showBookButton && (
                        <Link
                            href={`/patient/book?testId=${test._id}`}
                            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                        >
                            Book Now
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
