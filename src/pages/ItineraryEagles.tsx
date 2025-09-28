import React from "react";
import { Check, X } from "lucide-react";

const featuresList = [
  {
    key: "visa",
    label: "Visa Application (for Ghanaian passport holders only)",
    appliesTo: ["Silver", "Gold"], // ✅ Only Silver & Gold
  },
  {
    key: "train",
    label: "Fès ↔ Casablanca: Round-trip train connections",
    appliesTo: ["Bronze", "Silver", "Gold"], // ✅ All
    notes: {
      Gold: "(Train Tickets in Premium First Class)",
    },
  },
  {
    key: "shuttle",
    label: "Hotel Shuttle services",
    appliesTo: ["Bronze", "Silver", "Gold"],
  },
  {
    key: "bnb",
    label: "Bed & Breakfast (7 days and 6 nights)",
    appliesTo: ["Bronze", "Silver", "Gold"],
    notes: {
      Bronze: "(Shared room in a cozy hostel or traditional riad)",
      Silver: "(Private room in a comfortable 2-star hotel)",
      Gold: "(Private room in a stylish 3-star hotel)",
    },
  },
  {
    key: "tax",
    label: "Covers Mandatory City Tax",
    appliesTo: ["Bronze", "Silver", "Gold"],
  },
  {
    key: "dinner",
    label: "3 course Moroccan Welcome Dinner",
    appliesTo: ["Bronze", "Silver", "Gold"],
  },
  {
    key: "tickets",
    label:
      "Official match tickets and transfers for Nigeria vs Tanzania and Nigeria vs Tunisia games",
    appliesTo: ["Bronze", "Silver", "Gold"],
  },
  {
    key: "desert",
    label:
      "Overnight desert camping safari + breakfast & dinner. Merzouga section - via Ifrane & Azrou cedar forest (coffee/photo stops); Midelt lunch stop; Ziz Valley viewpoint.",
    appliesTo: ["Bronze", "Silver", "Gold"],
    notes: {
      Gold: "(Desert Glamping Experience)",
    },
  },
  {
    key: "meknes",
    label:
      "Meknes visit + Volubilis ruins (Roman site) + Moulay Idriss viewpoint",
    appliesTo: ["Bronze", "Silver", "Gold"],
  },
  {
    key: "wellness",
    label: "60 Minutes of Wellness: Hammam & Massage Retreat",
    appliesTo: ["Silver", "Gold"], // ✅ Only Silver & Gold
  },
  {
    key: "memento",
    label: "Exclusive Dunia Safari Memento",
    appliesTo: ["Bronze", "Silver", "Gold"],
  },
];

const packages = [
  { name: "Bronze", price: "Starting from $760" },
  { name: "Silver", price: "Starting from $920" },
  { name: "Gold", price: "Starting from $1150" },
];

const ItineraryElephants: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Elephants in the Atlas
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Activities</th>
              {packages.map((pkg) => (
                <th key={pkg.name} className="p-4 text-center">
                  <div className="font-semibold">{pkg.name}</div>
                  <div className="text-sm text-gray-500">{pkg.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresList.map((feature) => (
              <tr key={feature.key} className="border-t">
                <td className="p-4 text-sm">
                  {feature.label}
                  {/* Notes / bullet points */}
                  {feature.notes && (
                    <ul className="mt-1 text-xs text-gray-600 list-disc pl-5">
                      {Object.entries(feature.notes).map(([pkg, note]) => (
                        <li key={pkg}>
                          {pkg}: {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                {packages.map((pkg) => (
                  <td key={pkg.name} className="p-4 text-center">
                    {feature.appliesTo.includes(pkg.name) ? (
                      <Check className="text-green-500 inline" />
                    ) : (
                      <X className="text-red-500 inline" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItineraryElephants;
