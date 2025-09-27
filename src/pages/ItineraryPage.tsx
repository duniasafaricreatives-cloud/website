// src/pages/ItineraryPage.tsx
import React from "react";

const ItineraryPage: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Our Sahara Itinerary Packages
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Choose the perfect adventure for your trip. Compare our packages below:
        </p>

        {/* Pricing Table */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Basic Explorer
            </h3>
            <p className="text-gray-600 mb-6">
              Perfect for solo travelers or quick visits.
            </p>
            <p className="text-4xl font-bold text-blue-600 mb-6">$299</p>
            <ul className="text-gray-600 space-y-3 flex-1">
              <li>✅ 2 Days Sahara Experience</li>
              <li>✅ Desert camp stay</li>
              <li>✅ Guided camel ride</li>
              <li>❌ No meals included</li>
              <li>❌ No cultural tour</li>
            </ul>
            <button className="mt-8 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Choose Basic
            </button>
          </div>

          {/* Standard */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-8 flex flex-col scale-105">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Standard Adventure
            </h3>
            <p className="text-gray-600 mb-6">
              A balanced mix of culture and desert fun.
            </p>
            <p className="text-4xl font-bold text-blue-600 mb-6">$599</p>
            <ul className="text-gray-600 space-y-3 flex-1">
              <li>✅ 4 Days Sahara Adventure</li>
              <li>✅ Desert camp & hotel stays</li>
              <li>✅ Guided camel & 4x4 rides</li>
              <li>✅ Traditional meals included</li>
              <li>❌ No city tour</li>
            </ul>
            <button className="mt-8 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Choose Standard
            </button>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Premium Journey
            </h3>
            <p className="text-gray-600 mb-6">
              The full Moroccan Sahara experience.
            </p>
            <p className="text-4xl font-bold text-blue-600 mb-6">$999</p>
            <ul className="text-gray-600 space-y-3 flex-1">
              <li>✅ 7 Days Sahara Luxury Tour</li>
              <li>✅ Desert camp & luxury hotels</li>
              <li>✅ Camel, 4x4 & sandboarding</li>
              <li>✅ All meals included</li>
              <li>✅ City & cultural tours</li>
            </ul>
            <button className="mt-8 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Choose Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPage;
