export default function BookingCard({ booking, onDownloadReport, isAdmin = false, onUpdateStatus }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Sample Collected':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Completed':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">
                            {booking.testId?.title || 'Test'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Date</span>
                            <p className="font-medium text-gray-900">{formatDate(booking.bookingDate)}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Time</span>
                            <p className="font-medium text-gray-900">{booking.bookingTime}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Price</span>
                            <p className="font-medium text-primary-600">₹{booking.testId?.price || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Sample Type</span>
                            <p className="font-medium text-gray-900">{booking.testId?.sampleType || 'N/A'}</p>
                        </div>
                    </div>

                    {isAdmin && booking.userId && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Patient Name</span>
                                    <p className="font-medium text-gray-900">{booking.userId.name}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Email</span>
                                    <p className="font-medium text-gray-900">{booking.userId.email}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Phone</span>
                                    <p className="font-medium text-gray-900">{booking.userId.phone}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                {booking.status === 'Completed' && booking.reportPDF && (
                    <button
                        onClick={() => onDownloadReport && onDownloadReport(booking.reportPDF)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Report</span>
                    </button>
                )}

                {isAdmin && onUpdateStatus && (
                    <>
                        {booking.status === 'Pending' && (
                            <button
                                onClick={() => onUpdateStatus(booking._id, 'Sample Collected')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Mark Sample Collected
                            </button>
                        )}
                        {booking.status === 'Sample Collected' && (
                            <button
                                onClick={() => onUpdateStatus(booking._id, 'Completed')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Mark Completed
                            </button>
                        )}
                    </>
                )}

                {booking.status !== 'Completed' && !booking.reportPDF && (
                    <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Report will be available once testing is completed</span>
                    </div>
                )}
            </div>
        </div>
    );
}
