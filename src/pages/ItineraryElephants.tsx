import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Star } from "lucide-react";

const ItineraryElephants = () => {
  const packages = [
    { name: "Bronze", price: "Starting from $760", popular: false },
    { name: "Silver", price: "Starting from $1,200", popular: false },
    { name: "Gold", price: "Starting from $2,100", popular: true },
  ];

  const features = [
    {
      name: "Visa Application (for Ghanaian passport holders only)",
      availability: { Bronze: false, Silver: false, Gold: true },
    },
    { name: "Return Flights", availability: { Bronze: false, Silver: false, Gold: false } },
    {
      name: "Round-trip train connections",
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: ["Gold: Train Tickets in Premium First Class"],
    },
    { name: "Hotel Shuttle Services", availability: { Bronze: true, Silver: true, Gold: true } },
    { name: "3-course Moroccan Welcome Dinner", availability: { Bronze: true, Silver: true, Gold: true } },
    {
      name: "Bed & Breakfast (7 days and 6 nights)",
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [
        "Bronze: Shared room in a cozy hostel or traditional riad",
        "Silver: Private room in a comfortable 2-star hotel",
        "Gold: Private room in a stylish 3-star hotel",
      ],
    },
    { name: "Covers Mandatory City Taxes", availability: { Bronze: true, Silver: true, Gold: true } },
    {
      name: "2 Official match tickets and transfers for Ivory Coast vs Mozambique & Ivory Coast vs Cameroun games",
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: "Merzouga desert safari: overnight camping, sandboarding, stargazing (Berber camping + breakfast + dinner)",
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: ["Gold: Desert Glamping Experience"],
    },
    { name: "Saadian Tombs + Bahia Palace visit", availability: { Bronze: true, Silver: true, Gold: true } },
    { name: "Visit Tinghir & Dades Gorges", availability: { Bronze: true, Silver: true, Gold: true } },
    { name: "Visit Hollywood studio location (Game of Thrones & Gladiator)", availability: { Bronze: true, Silver: true, Gold: true } },
    {
      name: "60 Minutes of Wellness: Hammam Retreat",
      availability: { Bronze: false, Silver: true, Gold: true },
      notes: ["Gold: Hammam + Massage included"],
    },
    { name: "Enjoy cocktails at Marrakech Sunset Lounge", availability: { Bronze: false, Silver: false, Gold: true } },
    { name: "Day Trip to Essaouira", availability: { Bronze: true, Silver: true, Gold: true } },
    { name: "Day Trip to Ouzoud Waterfalls", availability: { Bronze: true, Silver: true, Gold: true } },
    { name: "Exclusive Dunia Safari Memento", availability: { Bronze: true, Silver: true, Gold: true } },
  ];

  // 🔹 Sub-itinerary features (with dashes)
  const subFeatures = [
    { name: "For Extended 12 Days, 11 Nights Stay to see 3 games, Contact Travel Agent" },
    { name: "Bed and Breakfast (11 Days & 10 Nights)" },
    { name: "3 Official match tickets and transfers for Ivory Coast vs Mozambique, Ivory Coast vs Cameroun, Ivory Coast vs Gabon games" },
    { name: "Return Day trip to Ourika + lunch" },
    { name: "Hot air balloon experience" },
    { name: "Visit Marjorelle Garden" },
    { name: "Visit YSL Berber Museum" },
    { name: "Dinner + New Year Eve Dunia Safari Party, Casablanca" },
  ];

  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const toggleAccordion = (pkg: string) => {
    setOpenPackage(openPackage === pkg ? null : pkg);
  };

  return (
    <div className="p-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold text-center mb-6 mt-8">
        Elephants Itinerary Packages
      </h2>

      {/* ==================== MAIN ITINERARY ==================== */}
      {/* Desktop Table View */}
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
                    <div className="mt-2 bg-white text-orange-600 px-2 py-1 text-xs font-bold rounded-full inline-flex items-center">
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

      {/* Mobile Accordion View */}
      <div className="md:hidden space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.name} className="border rounded-lg shadow-md overflow-hidden">
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
                {pkg.popular && (
                  <div className="mt-1 bg-white text-orange-600 px-2 py-1 text-xs font-bold rounded-full inline-flex items-center">
                    <Star size={12} className="mr-1" /> Most Popular
                  </div>
                )}
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

      {/* ==================== SUB-ITINERARY ==================== */}
      <h3 className="text-xl font-bold text-center mt-12 mb-6">
        Extended Itinerary (Optional)
      </h3>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left">Features</th>
              {packages.map((pkg) => (
                <th key={pkg.name} className="p-4 text-center bg-gray-200">
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
                    —{/* Dash for all */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion View */}
      <div className="md:hidden space-y-4 mt-6">
        {packages.map((pkg) => (
          <div key={pkg.name} className="border rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleAccordion(`sub-${pkg.name}`)}
              className="w-full flex justify-between items-center p-4 bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold">{pkg.name} - Extended</h3>
              </div>
              {openPackage === `sub-${pkg.name}` ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openPackage === `sub-${pkg.name}` && (
              <div className="p-4 bg-white space-y-3">
                {subFeatures.map((feature, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span>{feature.name}</span>
                    <span>—</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Download Itinerary Button */}
      <div className="mt-6 text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Download Full Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryElephants;
