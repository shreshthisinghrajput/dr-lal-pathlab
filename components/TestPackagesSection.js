'use client';

const testPackages = [
    {
        name: 'Swasth Fit SUPER 1',
        mrp: '₹ 2,350',
        price: '₹ 1,050',
        tests: ['Sugar Fasting', 'Thyroid Profile Total', 'Lipid Profile Screen', 'Urine R/E'],
        popular: false,
    },
    {
        name: 'Swasth Fit SUPER 2',
        mrp: '₹ 3,320',
        price: '₹ 1,250',
        tests: ['Sugar Fasting', 'Thyroid Profile Total', 'Lipid Profile Screen', 'Urine R/E', 'HbA1C'],
        popular: false,
    },
    {
        name: 'Swasth Fit SUPER 3',
        mrp: '₹ 5,180',
        price: '₹ 1,850',
        tests: ['Sugar Fasting', 'Thyroid Profile Total', 'Lipid Profile Screen', 'Urine R/E', 'HbA1C', 'Hemogram', 'LFT & KFT with GFR', 'Vitamin-D'],
        popular: true,
    },
    {
        name: 'Swasth Fit SUPER 4',
        mrp: '₹ 5,970',
        price: '₹ 2,050',
        tests: ['Sugar Fasting', 'Thyroid Profile Total', 'Lipid Profile Screen', 'Urine R/E', 'HbA1C', 'Hemogram', 'LFT & KFT with GFR', 'Vitamin-D', 'Vitamin-B12', 'CBC'],
        popular: false,
    },
    {
        name: 'Swasth Fit COMPLETE',
        mrp: null,
        price: '₹ 5,000',
        tests: ['Sugar Fasting', 'Thyroid Profile Total', 'Lipid Profile Screen', 'Urine R/E', 'HbA1C', 'Hemogram', 'LFT & KFT with GFR', 'Vitamin-D', 'Vitamin-B12', 'CBC', 'Iron Studies', 'Apo A1 & B', 'Amylase', 'HsCRP'],
        popular: false,
        featured: true,
    },
];

export default function TestPackagesSection() {
    return (
        <section className="py-20 bg-white" id="packages">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-secondary-600 font-semibold text-sm uppercase tracking-wider">Health Packages</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mt-2 mb-4">
                        Swasth Fit Packages
                    </h2>
                    <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Comprehensive health check-up packages at discounted prices
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testPackages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 ${pkg.featured
                                    ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white lg:col-span-1'
                                    : pkg.popular
                                        ? 'bg-gradient-to-br from-secondary-400 to-secondary-500 text-primary-900'
                                        : 'bg-white border-2 border-gray-100'
                                }`}
                        >
                            {/* Popular Badge */}
                            {pkg.popular && (
                                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    POPULAR
                                </div>
                            )}
                            {pkg.featured && (
                                <div className="absolute top-4 right-4 bg-secondary-400 text-primary-800 px-3 py-1 rounded-full text-xs font-bold">
                                    COMPLETE
                                </div>
                            )}

                            <div className="p-8">
                                {/* Package Name */}
                                <h3 className={`text-2xl font-bold mb-4 ${pkg.featured || pkg.popular ? '' : 'text-gray-900'}`}>
                                    {pkg.name}
                                </h3>

                                {/* Price */}
                                <div className="mb-6">
                                    {pkg.mrp && (
                                        <p className={`text-sm line-through ${pkg.featured ? 'text-blue-200' : pkg.popular ? 'text-primary-700' : 'text-gray-400'}`}>
                                            MRP: {pkg.mrp}
                                        </p>
                                    )}
                                    <p className={`text-4xl font-bold ${pkg.featured ? 'text-secondary-400' : pkg.popular ? 'text-primary-800' : 'text-primary-600'}`}>
                                        {pkg.price}
                                    </p>
                                </div>

                                {/* Tests Included */}
                                <div className="mb-6">
                                    <p className={`font-semibold mb-3 ${pkg.featured || pkg.popular ? '' : 'text-gray-700'}`}>
                                        Tests Included ({pkg.tests.length}):
                                    </p>
                                    <ul className="space-y-2">
                                        {pkg.tests.slice(0, 6).map((test, i) => (
                                            <li key={i} className="flex items-center text-sm">
                                                <svg className={`w-4 h-4 mr-2 flex-shrink-0 ${pkg.featured ? 'text-secondary-400' : pkg.popular ? 'text-primary-700' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className={pkg.featured ? 'text-blue-100' : pkg.popular ? 'text-primary-800' : 'text-gray-600'}>
                                                    {test}
                                                </span>
                                            </li>
                                        ))}
                                        {pkg.tests.length > 6 && (
                                            <li className={`text-sm font-medium ${pkg.featured ? 'text-blue-200' : pkg.popular ? 'text-primary-700' : 'text-gray-500'}`}>
                                                + {pkg.tests.length - 6} more tests
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Book Button */}
                                <a
                                    href="tel:9238745983"
                                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${pkg.featured
                                            ? 'bg-secondary-400 text-primary-800 hover:bg-secondary-300'
                                            : pkg.popular
                                                ? 'bg-primary-600 text-white hover:bg-primary-700'
                                                : 'bg-primary-600 text-white hover:bg-primary-700'
                                        }`}
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Test Inclusion Table */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8 overflow-x-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Test Inclusion Comparison</h3>
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Test Name</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-700">SUPER 1</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-700">SUPER 2</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-700 bg-secondary-100">SUPER 3</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-700">SUPER 4</th>
                                <th className="text-center py-3 px-2 font-semibold text-white bg-primary-600">COMPLETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Sugar Fasting', s1: true, s2: true, s3: true, s4: true, complete: true },
                                { name: 'Thyroid Profile Total', s1: true, s2: true, s3: true, s4: true, complete: true },
                                { name: 'Lipid Profile Screen', s1: true, s2: true, s3: true, s4: true, complete: true },
                                { name: 'Urine R/E', s1: true, s2: true, s3: true, s4: true, complete: true },
                                { name: 'HbA1C', s1: false, s2: true, s3: true, s4: true, complete: true },
                                { name: 'Hemogram', s1: false, s2: false, s3: true, s4: true, complete: true },
                                { name: 'LFT & KFT with GFR', s1: false, s2: false, s3: true, s4: true, complete: true },
                                { name: 'Vitamin-D', s1: false, s2: false, s3: true, s4: true, complete: true },
                                { name: 'Vitamin-B12', s1: false, s2: false, s3: false, s4: true, complete: true },
                                { name: 'CBC', s1: false, s2: false, s3: false, s4: true, complete: true },
                                { name: 'Iron Studies', s1: false, s2: false, s3: false, s4: false, complete: true },
                                { name: 'Apo A1 & B', s1: false, s2: false, s3: false, s4: false, complete: true },
                                { name: 'Amylase', s1: false, s2: false, s3: false, s4: false, complete: true },
                                { name: 'HsCRP', s1: false, s2: false, s3: false, s4: false, complete: true },
                            ].map((test, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-3 px-4 font-medium text-gray-700">{test.name}</td>
                                    <td className="text-center py-3 px-2">
                                        {test.s1 ? <span className="text-green-500 text-xl">✓</span> : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="text-center py-3 px-2">
                                        {test.s2 ? <span className="text-green-500 text-xl">✓</span> : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="text-center py-3 px-2 bg-secondary-50">
                                        {test.s3 ? <span className="text-green-600 text-xl font-bold">✓</span> : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="text-center py-3 px-2">
                                        {test.s4 ? <span className="text-green-500 text-xl">✓</span> : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="text-center py-3 px-2 bg-primary-50">
                                        {test.complete ? <span className="text-primary-600 text-xl font-bold">✓</span> : <span className="text-gray-300">—</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-gray-200 font-bold">
                                <td className="py-4 px-4 text-gray-900">Price</td>
                                <td className="text-center py-4 px-2 text-primary-600">₹1,050</td>
                                <td className="text-center py-4 px-2 text-primary-600">₹1,250</td>
                                <td className="text-center py-4 px-2 text-primary-700 bg-secondary-100">₹1,850</td>
                                <td className="text-center py-4 px-2 text-primary-600">₹2,050</td>
                                <td className="text-center py-4 px-2 text-white bg-primary-600">₹5,000</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">For bookings and inquiries, call us:</p>
                    <a href="tel:9238745983" className="inline-flex items-center text-2xl font-bold text-primary-600 hover:text-primary-700">
                        <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        9238745983
                    </a>
                </div>
            </div>
        </section>
    );
}
