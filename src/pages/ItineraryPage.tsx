import React, { useState } from "react";
import { Check, X, Star, ChevronDown, ChevronUp } from "lucide-react";

const ItineraryPage = () => {
  const packages = [
    {
      name: "Bronze",
      price: "Starting from $760",
      description: "This package excludes return flights",
      features: {
        breakfast: true,
        nigeriaTickets: true,
        ivoryTickets: false,
        threeGames: false,
        fesTours: true,
        marrakechTours: false,
        casablancaTours: false,
      },
      color: "from-green-600 to-green-700",
      popular: false,
    },
    {
      name: "Silver",
      price: "Starting from $815",
      description: "This package excludes return flights",
      features: {
        breakfast: true,
        nigeriaTickets: false,
        ivoryTickets: true,
        threeGames: false,
        fesTours: false,
        marrakechTours: true,
        casablancaTours: false,
      },
      color: "from-orange-500 to-orange-600",
      popular: true,
    },
    {
      name: "Gold",
      price: "Starting from $1,190",
      description: "This package excludes return flights",
      features: {
        breakfast: true,
        nigeriaTickets: false,
        ivoryTickets: false,
        threeGames: true,
        fesTours: true,
        marrakechTours: true,
        casablancaTours: true,
      },
      color: "from-yellow-400 to-yellow-600",
      popular: false,
    },
  ];

  const featuresList = [
    { key: "breakfast", label: "Fès ↔ Casablanca: Round-trip train connections" },
    { key: "nigeriaTickets", label: "Bed & Breakfast (7 days and 6 nights)" },
    { key: "ivoryTickets", label: "Welcome Dinner" },
    { key: "threeGames", label: "Official match tickets and transfers for Nigeria vs Tanzania and Nigeria vs Tunisa games" },
    { key: "fesTours", label: "Overnight desert camping safari + breakfast & dinner" },
    { key: "marrakechTours", label: "Tour activities in Marrakech" },
    { key: "casablancaTours", label: "Tour activities in Casablanca" },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-burgundy-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-burgundy-900 mb-4">
            AFCON 2025 Itinerary Packages
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Compare all Morocco AFCON packages side by side. Choose your
            adventure!
          </p>
        </div>

        {/* ===== Desktop / Tablet View (Comparison Table) ===== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 bg-gray-100 text-gray-700 font-semibold">
                  Features
                </th>
                {packages.map((pkg, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-center bg-gray-100 text-gray-900 font-bold"
                  >
                    <div
                      className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${pkg.color} text-white text-sm mb-2`}
                    >
                      {pkg.name}
                    </div>
                    <div className="text-lg font-bold">{pkg.price}</div>
                    <div className="text-sm text-gray-500">
                      {pkg.description}
                    </div>
                    {pkg.popular && (
                      <div className="mt-2 inline-flex items-center bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1" /> Most Popular
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuresList.map((feature, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-6 py-4 text-gray-700">{feature.label}</td>
                  {packages.map((pkg, pIdx) => (
                    <td key={pIdx} className="px-6 py-4 text-center">
                      {pkg.features[feature.key as keyof typeof pkg.features] ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA Row */}
              <tr className="border-t bg-gray-50">
                <td></td>
                {packages.map((pkg, idx) => (
                  <td key={idx} className="px-6 py-6 text-center">
                    <a
                      href="https://wa.me/233538087709"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block w-full bg-gradient-to-r ${pkg.color} text-white py-3 rounded-full font-semibold text-lg hover:shadow-md transition`}
                    >
                      Book Now
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===== Mobile View (Accordion) ===== */}
        <div className="block md:hidden space-y-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${pkg.color} text-white text-sm mb-1`}
                  >
                    {pkg.name}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {pkg.price}
                  </div>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                  {pkg.popular && (
                    <div className="mt-1 inline-flex items-center bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" /> Most Popular
                    </div>
                  )}
                </div>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-4 space-y-3">
                  {featuresList.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center justify-between border-b py-2"
                    >
                      <span className="text-gray-700">{feature.label}</span>
                      {pkg.features[feature.key as keyof typeof pkg.features] ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  ))}
                  <div className="pt-4">
                    <a
                      href="https://wa.me/233538087709"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center bg-gradient-to-r ${pkg.color} text-white py-3 rounded-full font-semibold text-lg hover:shadow-md transition`}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              )}
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
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition"
          >
            Download Itinerary
          </a>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPage;
