import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

const ItineraryEagles = () => {
  const packages = [
    {
      name: "Bronze",
      price: "Starting from $760",
      description: "This package excludes return flights",
      color: "border-[#cd7f32]", // Bronze
      bullet: "list-disc text-[#cd7f32]", // Bronze-style bullet
    },
    {
      name: "Silver",
      price: "Starting from $1,290",
      description: "Includes added comforts and wellness",
      color: "border-gray-400", // Silver
      bullet: "list-decimal text-gray-500", // Silver-style bullet
    },
    {
      name: "Gold",
      price: "Starting from $2,490",
      description: "Premium experience with luxury add-ons",
      color: "border-yellow-500", // Gold
      bullet: "list-square text-yellow-600", // Gold-style bullet
    },
  ];

  const featuresList = [
    {
      label: "Visa Application (for Ghanaian passport holders only)",
      appliesTo: ["Silver", "Gold"],
    },
    {
      label: "Fès ↔ Casablanca: Round-trip train connections",
      appliesTo: ["Bronze", "Silver", "Gold"],
      notes: ["Gold: Train Tickets in Premium First Class"],
    },
    {
      label: "Hotel Shuttle services",
      appliesTo: ["Bronze", "Silver", "Gold"],
    },
    {
      label: "Bed & Breakfast (7 days and 6 nights)",
      appliesTo: ["Bronze", "Silver", "Gold"],
      notes: [
        "Bronze: Shared room in a cozy hostel or traditional riad",
        "Silver: Private room in a comfortable 2-star hotel",
        "Gold: Private room in a stylish 3-star hotel",
      ],
    },
    {
      label: "Covers Mandatory City Tax",
      appliesTo: ["Bronze", "Silver", "Gold"],
    },
    {
      label: "3 course Moroccan Welcome Dinner",
      appliesTo: ["Bronze", "Silver", "Gold"],
    },
    {
      label: "Official match tickets and transfers for Nigeria vs Tanzania and Nigeria vs Tunisia games",
      appliesTo: ["Bronze", "Silver", "Gold"],
    },
    {
      label:
        "Overnight desert camping safari + breakfast & dinner. Merzouga section - via Ifrane & Azrou cedar forest (coffee/photo stops); Midelt lunch stop; Ziz Valley viewpoint.",
      appliesTo: ["Bronze", "Silver", "Gold"],
      notes: ["Gold: Desert Glamping Experience"],
    },
    {
      label: "Meknes visit + Volubilis ruins (Roman site) + Moulay Idriss viewpoint",
      appliesTo: ["Bronze", "Silver", "Gold"],
    },
    {
      label: "60 Minutes of Wellness: Hammam & Massage Retreat",
      appliesTo: ["Silver", "Gold"],
    },
    {
      label: "Exclusive Dunia Safari Memento",
      appliesTo: ["Bronze", "Silver", "Gold"],
    },
  ];

  const [expanded, setExpanded] = useState(false);

  // Helper to style notes according to package type
  const getBulletStyle = (note) => {
    if (note.startsWith("Bronze")) return packages[0].bullet;
    if (note.startsWith("Silver")) return packages[1].bullet;
    if (note.startsWith("Gold")) return packages[2].bullet;
    return "list-disc"; // fallback
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Eagles Itinerary Packages
      </h1>

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`border-4 ${pkg.color} rounded-lg p-6 shadow-md`}
          >
            <h2 className="text-2xl font-semibold mb-2">{pkg.name}</h2>
            <p className="text-lg mb-2">{pkg.price}</p>
            <p className="text-sm text-gray-600">{pkg.description}</p>
          </div>
        ))}
      </div>

      {/* Features Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Activities</th>
              {packages.map((pkg, idx) => (
                <th key={idx} className="p-3 text-center">
                  {pkg.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(expanded ? featuresList : featuresList.slice(0, 5)).map(
              (feature, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3 align-top">
                    <div>{feature.label}</div>
                    {feature.notes && (
                      <ul
                        className="pl-5 mt-1 text-sm space-y-1"
                      >
                        {feature.notes.map((note, nIdx) => (
                          <li
                            key={nIdx}
                            className={getBulletStyle(note)}
                          >
                            {note}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  {packages.map((pkg, pIdx) => (
                    <td key={pIdx} className="p-3 text-center">
                      {feature.appliesTo.includes(pkg.name) ? (
                        <Check className="text-green-600 inline" />
                      ) : (
                        <X className="text-red-500 inline" />
                      )}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Show More / Less Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-blue-600 font-medium"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp size={18} />
            </>
          ) : (
            <>
              Show More <ChevronDown size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ItineraryEagles;
