import React from "react";
import { useParams } from "react-router-dom";
import { Check } from "lucide-react";

const itineraries = {
  "eagles-over-the-atlas": {
    title: "Eagles over the Atlas",
    bronze: 760,
    silver: 950,
    gold: 1200,
    activities: [
      { name: "Bed & Breakfast", bronze: true, silver: true, gold: true },
      { name: "Official Match Tickets", bronze: true, silver: true, gold: true },
      { name: "Transfers (stadium/hotel)", bronze: true, silver: true, gold: true },
      { name: "Guided City Tour", bronze: false, silver: true, gold: true },
      { name: "Desert Safari", bronze: false, silver: false, gold: true },
    ],
  },
  "elephants-in-the-atlas": {
    title: "Elephants in the Atlas",
    bronze: 815,
    silver: 1000,
    gold: 1300,
    activities: [
      { name: "Bed & Breakfast", bronze: true, silver: true, gold: true },
      { name: "Official Match Tickets", bronze: true, silver: true, gold: true },
      { name: "Transfers (stadium/hotel)", bronze: true, silver: true, gold: true },
      { name: "Marrakech Souk Tour", bronze: false, silver: true, gold: true },
      { name: "Atlas Mountains Day Trip", bronze: false, false, gold: true },
    ],
  },
  "morocco-hat-trick-circuit": {
    title: "Morocco Hat Trick Circuit",
    bronze: 1190,
    silver: 1400,
    gold: 1700,
    activities: [
      { name: "Bed & Breakfast", bronze: true, silver: true, gold: true },
      { name: "Match Tickets", bronze: true, silver: true, gold: true },
      { name: "Transfers (all cities)", bronze: true, silver: true, gold: true },
      { name: "City Tours (Casablanca, FES)", bronze: false, silver: true, gold: true },
      { name: "Sahara Desert Safari", bronze: false, false, gold: true },
    ],
  },
};

const ItineraryPage = () => {
  const { id } = useParams();
  const itinerary = itineraries[id];

  if (!itinerary) {
    return <div className="text-center py-20">Itinerary not found.</div>;
  }

  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center text-burgundy-900">
          {itinerary.title} Itinerary
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-12"></div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-burgundy-900 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Activities</th>
                <th className="py-4 px-6 text-center">Bronze (${itinerary.bronze})</th>
                <th className="py-4 px-6 text-center">Silver (${itinerary.silver})</th>
                <th className="py-4 px-6 text-center">Gold (${itinerary.gold})</th>
              </tr>
            </thead>
            <tbody>
              {itinerary.activities.map((activity, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6">{activity.name}</td>
                  <td className="py-4 px-6 text-center">
                    {activity.bronze && <Check className="w-5 h-5 text-green-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {activity.silver && <Check className="w-5 h-5 text-green-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {activity.gold && <Check className="w-5 h-5 text-green-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ItineraryPage;
