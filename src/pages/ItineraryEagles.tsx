import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Star } from "lucide-react";

const ItineraryEagles = () => {
  const packages = [
    { name: "Bronze", price: "Starting from $760", popular: false },
    { name: "Silver", price: "Starting from $1,200", popular: true },
    { name: "Gold", price: "Starting from $2,100", popular: false },
  ];

  const features = [
    {
      name: "Visa Application (for Ghanaian passport holders only)",
      availability: { Bronze: false, Silver: true, Gold: true },
    },
    {
      name: "Fès ↔ Casablanca: Round-trip train connections",
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: ["Gold: Train Tickets in Premium First Class"],
    },
    {
      name: "Hotel Shuttle Services",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: "Bed & Breakfast (7 days and 6 nights)",
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [
        "Bronze: Shared room in a cozy hostel or traditional riad",
        "Silver: Private room in a comfortable 2-star hotel",
        "Gold: Private room in a stylish 3-star hotel",
      ],
    },
    {
      name: "Covers Mandatory City Tax",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: "3-course Moroccan Welcome Dinner",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: "Official match tickets and transfers for Nigeria vs Tanzania and Nigeria vs Tunisia games",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: "Overnight desert camping safari + breakfast & dinner (Merzouga section via Ifrane & Azrou cedar forest; Midelt lunch stop; Ziz Valley viewpoint)",
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: ["Gold: Desert Glamping Experience"],
    },
    {
      name: "Meknes visit + Volubilis ruins (Roman site) + Moulay Idriss viewpoint",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: "60 Minutes of Wellness: Hammam Retreat",
      availability: { Bronze: false, Silver: true, Gold: true },
      notes: ["Gold: Hammam + Massage included"],
    },
    {
      name: "Exclusive Dunia Safari Memento",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
  ];

  // NEW SUB ITINERARY
  const subFeatures = [
    {
      name: "For Extended 12 Days, 11 Nights Stay to see 3 games, Contact Travel Agent",
    },
    {
      name: "Bed and Breakfast (11 Days & 10 Nights)",
    },
    {
      name: "3 Official match tickets and transfers for Nigeria vs Tanzania, Nigeria vs Tunisia & Nigeria vs Uganda games",
    },
    {
      name: "Round-Trip Transfers to Chefchaouen",
    },
    {
      name: "Full-Day Excursion to Akchour Waterfalls",
    },
    {
      name: "Visit to the Hassan II Mosque, Casablanca",
    },
    {
      name: "Visit Corniche d’Aïn Diab, Casablanca",
    },
    {
      name: "Relaxing Beach Day on Casablanca’s Coast",
    },
    {
      name: "Shopping in Casablanca Medina",
    },
  ];

  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const [openSubPackage, setOpenSubPackage] = useState<string | null>(null);

  const toggleAccordion = (pkg: string) => {
    setOpenPackage(openPackage === pkg ? null : pkg);
  };

  const toggleSubAccordion = (pkg: string) => {
    setOpenSubPackage(openSubPackage === pkg ? null : pkg);
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 mt-12">
        Eagles Itinerary Packages
      </h1>

      {/* ===== MAIN ITINERARY (unchanged) ===== */}
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left">Features</th>
              {packages.map((pkg) => (
                <th
                  key={pkg.name}
                  className={`p-4 text-center relative ${
                    pkg.popular
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {pkg.name}
                  <div className="text-sm font-normal">{pkg.price}</div>
                  {pkg.popular && (
                    <div className="absolute inset-x-0 -bottom-5 mx-auto w-max bg-white text-orange-600 px-3 py-1 text-xs font-bold rounded-full flex items-center shadow-md">
                      <Star size={12} className="mr-1" /> Most Popular
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-4 text-sm">
                  {feature.name}
                  {feature.notes && (
                    <ul className="list-disc list-inside mt-1 text-gray-500 text-xs">
                      {feature.notes.map((note, nIdx) => (
                        <li key={nIdx}>{note}</li>
                      ))}
                    </ul>
                  )}
                </td>
                {packages.map((pkg) => (
                  <td key={pkg.name} className="text-center p-4">
                    {feature.availability[pkg.name] ? (
                      <Check className="text-green-500 inline" />
                    ) : (
                      <X className="text-red-500 inline" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              {packages.map((pkg) => (
                <td key={pkg.name} className="p-4 text-center">
                  <a 
                    href="https://wa.me/233538087709" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Book Now
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4 mt-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(pkg.name)}
              className={`w-full flex justify-between items-center p-4 ${
                pkg.popular
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                <p className="text-sm">{pkg.price}</p>
              </div>
              {openPackage === pkg.name ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openPackage === pkg.name && (
              <div className="p-4 bg-white space-y-3">
                {features.map((feature, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-sm">
                      <span>{feature.name}</span>
                      {feature.availability[pkg.name] ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )}
                    </div>
                    {feature.notes && (
                      <ul className="list-disc list-inside mt-1 text-gray-500 text-xs">
                        {feature.notes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                <a 
                  href="https://wa.me/233538087709" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  Book Now
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== SUB ITINERARY ===== */}
      <h2 className="text-2xl font-bold text-center mt-16 mb-6">
        For Extended 12 Days, 11 Nights Stay to see 3 games (Contact Travel Agent)
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-gray-50 rounded-lg shadow-inner p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-200 p-4 text-left">Features</th>
              {packages.map((pkg) => (
                <th key={pkg.name} className="bg-gray-100 p-4 text-center">
                  {pkg.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subFeatures.map((feature, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-4 text-sm">{feature.name}</td>
                {packages.map((pkg) => (
                  <td key={pkg.name} className="text-center p-4">
                    —
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4 mt-6 bg-gray-50 rounded-lg p-4 shadow-inner">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="border rounded-lg shadow-sm overflow-hidden bg-white"
          >
            <button
              onClick={() => toggleSubAccordion(pkg.name)}
              className="w-full flex justify-between items-center p-4 bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
              </div>
              {openSubPackage === pkg.name ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSubPackage === pkg.name && (
              <div className="p-4 space-y-3">
                {subFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{feature.name}</span>
                    <span className="text-gray-500">—</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Download Button */}
      <div className="mt-12 text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Download Full Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryEagles;
