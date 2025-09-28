import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ItineraryEagles = () => {
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Main Itinerary (already done earlier)
  const mainItinerary = [
    {
      activity: "Visa Application (for Nigerian passport holders only)",
      bronze: true,
      silver: true,
      gold: true,
    },
    {
      activity: "Return Flights",
      bronze: false,
      silver: false,
      gold: false,
    },
    {
      activity: "Round-trip train connections",
      bronze: true,
      silver: true,
      gold: true,
      note: "(gold: Train Tickets in Premium First Class)",
    },
    {
      activity: "Hotel Shuttle Services",
      bronze: true,
      silver: true,
      gold: true,
    },
    {
      activity: "3-course Moroccan Welcome Dinner",
      bronze: true,
      silver: true,
      gold: true,
    },
  ];

  // Sub Itinerary (NEW section)
  const subItinerary = [
    {
      activity: "For Extended 12 Days, 11 Nights Stay to see 3 games, Contact Travel Agent",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Bed and Breakfast (11 Days & 10 Nights)",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "3 Official match tickets and transfers for Nigeria vs Tanzania, Nigeria vs Tunisia & Nigeria vs Uganda games",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Round-Trip Transfers to Chefchaouen",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Full-Day Excursion to Akchour Waterfalls",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Visit to the Hassan II Mosque, Casablanca",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Visit Corniche d’Aïn Diab, Casablanca",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Relaxing Beach Day on Casablanca’s Coast",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
    {
      activity: "Shopping in Casablanca Medina",
      bronze: "—",
      silver: "—",
      gold: "—",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-10">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8">Itinerary – Eagles</h2>

      {/* Toggle Button */}
      <div
        className="flex justify-center items-center cursor-pointer mb-6"
        onClick={toggleDetails}
      >
        <span className="text-lg font-semibold">
          {showDetails ? "Hide Itinerary" : "Show Itinerary"}
        </span>
        {showDetails ? (
          <ChevronUp className="ml-2" />
        ) : (
          <ChevronDown className="ml-2" />
        )}
      </div>

      {showDetails && (
        <>
          {/* ===== MAIN ITINERARY ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Activities</th>
                  <th className="p-3 text-center">Bronze</th>
                  <th className="p-3 text-center">Silver</th>
                  <th className="p-3 text-center">Gold</th>
                </tr>
              </thead>
              <tbody>
                {mainItinerary.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      {item.activity}
                      {item.note && (
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          <li>{item.note}</li>
                        </ul>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {item.bronze ? "✔️" : "—"}
                    </td>
                    <td className="p-3 text-center">
                      {item.silver ? "✔️" : "—"}
                    </td>
                    <td className="p-3 text-center">
                      {item.gold ? "✔️" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== SUB ITINERARY ===== */}
          <h3 className="text-2xl font-semibold mt-10 mb-4 text-center">
            Extended Itinerary (Optional)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Activities</th>
                  <th className="p-3 text-center">Bronze</th>
                  <th className="p-3 text-center">Silver</th>
                  <th className="p-3 text-center">Gold</th>
                </tr>
              </thead>
              <tbody>
                {subItinerary.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.activity}</td>
                    <td className="p-3 text-center">{item.bronze}</td>
                    <td className="p-3 text-center">{item.silver}</td>
                    <td className="p-3 text-center">{item.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ItineraryEagles;
