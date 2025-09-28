import React from "react";
import { Check, X } from "lucide-react";

const featuresList = [
  {
    key: "visa",
    label: "Visa Application (for Ghanaian passport holders only)",
    notes: {
      silver: null,
      gold: null,
    },
  },
  {
    key: "train",
    label: "Fès ↔ Casablanca: Round-trip train connections",
    notes: {
      gold: "Train Tickets in Premium First Class",
    },
  },
  {
    key: "shuttle",
    label: "Hotel Shuttle services",
  },
  {
    key: "bnb",
    label: "Bed & Breakfast (7 days and 6 nights)",
    notes: {
      bronze: "Shared room in a cozy hostel or traditional riad",
      silver: "Private room in a comfortable 2-star hotel",
      gold: "Private room in a stylish 3-star hotel",
    },
  },
  {
    key: "tax",
    label: "Covers Mandatory City Tax",
  },
  {
    key: "dinner",
    label: "3 course Moroccan Welcome Dinner",
  },
  {
    key: "tickets",
    label:
      "Official match tickets and transfers for Nigeria vs Tanzania and Nigeria vs Tunisia games",
  },
  {
    key: "desert",
    label:
      "Overnight desert camping safari + breakfast & dinner (Merzouga section via Ifrane & Azrou cedar forest with coffee/photo stops, Midelt lunch stop, Ziz Valley viewpoint)",
    notes: {
      gold: "Desert Glamping Experience",
    },
  },
  {
    key: "meknes",
    label:
      "Meknes visit + Volubilis ruins (Roman site) + Moulay Idriss viewpoint",
  },
  {
    key: "wellness",
    label: "60 Minutes of Wellness: Hammam & Massage Retreat",
  },
  {
    key: "memento",
    label: "Exclusive Dunia Safari Memento",
  },
];

const packages = [
  {
    name: "Bronze",
    price: "Starting from $760",
    description: "This package excludes return flights",
    features: {
      visa: false,
      train: true,
      shuttle: true,
      bnb: true,
      tax: true,
      dinner: true,
      tickets: true,
      desert: true,
      meknes: true,
      wellness: false,
      memento: true,
    },
  },
  {
    name: "Silver",
    price: "Starting from $920",
    description: "This package excludes return flights",
    features: {
      visa: true,
      train: true,
      shuttle: true,
      bnb: true,
      tax: true,
      dinner: true,
      tickets: true,
      desert: true,
      meknes: true,
      wellness: true,
      memento: true,
    },
  },
  {
    name: "Gold",
    price: "Starting from $1150",
    description: "This package excludes return flights",
    features: {
      visa: true,
      train: true,
      shuttle: true,
      bnb: true,
      tax: true,
      dinner: true,
      tickets: true,
      desert: true,
      meknes: true,
      wellness: true,
      memento: true,
    },
  },
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
              <th className="p-4 text-left">Features</th>
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
                  {/* Show notes if any exist */}
                  <ul className="mt-1 text-xs text-gray-600 list-disc pl-5">
                    {packages.map(
                      (pkg) =>
                        feature.notes?.[pkg.name.toLowerCase()] && (
                          <li key={pkg.name}>
                            {pkg.name}: {feature.notes[pkg.name.toLowerCase()]}
                          </li>
                        )
                    )}
                  </ul>
                </td>
                {packages.map((pkg) => (
                  <td key={pkg.name} className="p-4 text-center">
                    {pkg.features[feature.key] ? (
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
