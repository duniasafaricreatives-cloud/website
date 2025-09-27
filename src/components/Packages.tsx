import React from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import Link

const Packages = () => {
  const packages = [
    {
      name: 'Eagles over the Atlas',
      popular: false,
      price: 'Starting from $760',
      description: 'This package excludes return flights',
      features: [
        'Bed and Breakfast',
        'Official match tickets and transfers to cheer on the Super Eagles of Nigeria',
        'Tour activities and transfers in FES, Morocco'
      ],
      color: 'from-green-600 to-green-700', // Nigeria green
      bgColor: 'bg-white'
    },
    {
      name: 'Elephants in the Atlas',
      popular: true,
      price: 'Starting from $815',
      description: 'This package excludes return flights',
      features: [
        'Bed and Breakfast',
        'Official match tickets and transfers to cheer on the Super éléphants of Ivory Coast',
        'Tour activities in Marrakech and transfers'
      ],
      color: 'from-orange-500 to-orange-600', // Ivory Coast orange
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Morocco hat trick circuit',
      popular: false,
      price: 'Starting from $1,190',
      description: 'This package excludes return flights',
      features: [
        'Bed and Breakfast',
        'Official match tickets to see three games in three different cities',
        'Tour activities and transfers in Casablanca, Fes and Marrakech'
      ],
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-white'
    }
  ];

  return (
    <section id="packages" className="py-16 md:py-24 bg-burgundy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            AFCON 2025 Packages
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your perfect Morocco AFCON experience
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative ${pkg.bgColor} rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                pkg.popular ? 'ring-4 ring-amber-500' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 rounded-bl-lg font-semibold text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-8">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${pkg.color} text-white font-bold text-lg mb-4`}>
                    {pkg.name}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button → Now links to itinerary page */}
                <Link
                  to="/itinerary"
                  className={`block text-center bg-gradient-to-r ${pkg.color} text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                >
                  View {pkg.name} itinerary
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* New Download Itinerary CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-100 text-lg mb-4">
            Still undecided? Download the AFCON 2025 itinerary and share with your squad.
          </p>
          <a
            href="https://drive.google.com/file/d/1CM7mLCJlxGaSwL-wMGuwtGBe8YRVHWkV/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 mb-8"
          >
            Download Itinerary
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-300 mb-6">
            Prefer to skip AFCON but still want to experience Morocco?
          </p>
          <a
            href="https://forms.gle/5eCVqkXjoKoorqBQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-burgundy-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Custom Package Inquiry
          </a>
        </div>
      </div>
    </section>
  );
};

export default Packages;
