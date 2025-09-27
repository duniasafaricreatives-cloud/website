import React from 'react';
import { Check, Star } from 'lucide-react';

const Packages = () => {
  const packages = [
    {
      name: 'Eagles over the Atlas',
      popular: false,
      price: 'Starting from $760',
      description: 'This package excludes return flights',
      features: [
        'Bed and Breakfast',
        'Match tickets and transfers',
        'All Local transfers',
        'Tour activities in FES and tranfers'
      ],
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-white'
    },
    {
      name: 'Elephants in the Atlas',
      popular: true,
      price: 'Starting from $815',
      description: 'This package excludes return flights',
      features: [
        '[Silver feature 1]',
        '[Silver feature 2]',
        '[Silver feature 3]',
        '[Silver feature 4]',
        '[Silver feature 5]'
      ],
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Gold',
      popular: false,
      price: '[Price]',
      description: '[Gold package description placeholder]',
      features: [
        '[Gold feature 1]',
        '[Gold feature 2]',
        '[Gold feature 3]',
        '[Gold feature 4]',
        '[Gold feature 5]',
        '[Gold feature 6]'
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

                {/* CTA Button */}
                <button className={`w-full bg-gradient-to-r ${pkg.color} text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}>
                  [Select {pkg.name} Package]
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            Need a custom package? Contact us for personalized options
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