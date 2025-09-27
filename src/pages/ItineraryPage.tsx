import React from "react";
import { Check, Star } from "lucide-react";

const ItineraryPage = () => {
  const packages = [
    {
      name: "Eagles over the Atlas",
      price: "Starting from $760",
      description: "This package excludes return flights",
      features: [
        "Bed and Breakfast",
        "Official match tickets and transfers to cheer on the Super Eagles of Nigeria",
        "Tour activities and transfers in FES, Morocco",
      ],
      color: "from-green-600 to-green-700", // Nigeria green
      popular: false,
      bgColor: "bg-white",
    },
    {
      name: "Elephants in the Atlas",
      price: "Starting from $815",
      description: "This package excludes return flights",
      features: [
        "Bed and Breakfast",
        "Official match tickets and transfers to cheer on the Super éléphants of Ivory Coast",
        "Tour activities in Marrakech and transfers",
      ],
      color: "from-orange-500 to-orange-600", // Ivory Coast orange
      popular: true,
      bgColor: "bg-gray-50",
    },
    {
      name: "Morocco Hat Trick Circuit",
      price: "Starting from $1,190",
      description: "This package excludes return flights",
      features: [
        "Bed and Breakfast",
        "Official match tickets to see three games in three different cities",
        "Tour activities and transfers in Casablanca, Fes and Marrakech",
      ],
      color: "from-yellow-400 to-yellow-600", // Morocco gold
      popular: false,
      bgColor: "bg-white",
    },
  ];

  return (
    <section className="py-20 bg-burgundy-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-burgundy-900 mb-4">
            AFCON 2025 Itinerary Packages
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose the perfect Morocco AFCON 2025 experience. All packages
            include official match tickets, transfers, and unforgettable
            activities.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative ${pkg.bgColor} rounded-2xl shadow-lg p-8 flex flex-col transform transition-all duration-300 hover:scale-105 ${
                pkg.popular ? "ring-4 ring-amber-500" : ""
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg font-semibold text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" /> Most Popular
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${pkg.color} text-white font-bold text-lg mb-4`}
                >
                  {pkg.name}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {pkg.price}
                </div>
                <p className="text-gray-600">{pkg.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <a
                  href="https://forms.gle/5eCVqkXjoKoorqBQ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center bg-gradient-to-r ${pkg.color} text-white py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg`}
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-4">
            Still undecided? Download the AFCON 2025 itinerary and share with
            your squad.
          </p>
          <a
            href="https://drive.google.com/file/d/1CM7mLCJlxGaSwL-wMGuwtGBe8YRVHWkV/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300"
          >
            Download Itinerary
          </a>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPage;
