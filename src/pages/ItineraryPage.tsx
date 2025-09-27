import React from "react";
import { Check } from "lucide-react";

const tiers = [
  { name: "Bronze", price: 760, color: "bg-gray-100" },
  { name: "Silver", price: 950, color: "bg-gray-200" },
  { name: "Gold", price: 1200, color: "bg-gray-300" },
];

const activities = [
  { name: "Bed & Breakfast", bronze: true, silver: true, gold: true },
  { name: "Official Match Tickets", bronze: true, silver: true, gold: true },
  { name: "Transfers (stadium/hotel)", bronze: true, silver: true, gold: true },
  { name: "Guided City Tour (FES / Marrakech)", bronze: false, silver: true, gold: true },
  { name: "Desert Safari", bronze: false, silver: false, gold: true },
  { name: "Atlas Mountains Day Trip", bronze: false, silver: false, gold: true },
  { name: "Multi-city Tours (Casablanca, FES, Marrakech)", bronze: false, silver: true, gold: true },
];

const ItineraryPage = () => {
  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center text-burgundy-900">
          AFCON 2025 Itinerary Packages
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-12"></div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-burgundy-900 text-white">
              <tr>
                <th className="py-4 px-6 text-left text-lg">Activities</th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className="py-4 px-6 text-center text-lg"
                  >
                    {tier.name} <br />
                    <span className="text-amber-400 text-base font-semibold">
                      ${tier.price}+
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6 text-gray-800">{activity.name}</td>
                  <td className="py-4 px-6 text-center">
                    {activity.bronze && (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {activity.silver && (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {activity.gold && (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <a
            href="https://forms.gle/5eCVqkXjoKoorqBQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300"
          >
            Book Your Package
          </a>
        </div>
      </div>
    </main>
  );
};

export default ItineraryPage;
