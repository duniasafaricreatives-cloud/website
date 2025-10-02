import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ItineraryEagles = () => {
  const { t } = useTranslation();
  
  const packages = [
    { name: t('itineraryEagles.bronzePackageName'), price: t('itineraryEagles.bronzePackagePrice'), popular: false },
    { name: t('itineraryEagles.silverPackageName'), price: t('itineraryEagles.silverPackagePrice'), popular: true },
    { name: t('itineraryEagles.goldPackageName'), price: t('itineraryEagles.goldPackagePrice'), popular: false },
  ];

  const features = [
    {
      name: t('itineraryEagles.features.visaGhana'),
      availability: { Bronze: false, Silver: false, Gold: true },
    },
    {
      name: t('itineraryEagles.features.trainConnections'),
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [t('itineraryEagles.features.trainNotesGold')],
    },
    {
      name: t('itineraryEagles.features.hotelShuttle'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: t('itineraryEagles.features.bedBreakfast'),
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [
        t('itineraryEagles.features.bedBreakfastNotesBronze'),
        t('itineraryEagles.features.bedBreakfastNotesSilver'),
        t('itineraryEagles.features.bedBreakfastNotesGold'),
      ],
    },
    {
      name: t('itineraryEagles.features.cityTax'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: t('itineraryEagles.features.welcomeDinner'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: t('itineraryEagles.features.matchTickets'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: t('itineraryEagles.features.desertSafari'),
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [t('itineraryEagles.features.desertSafariNotesGold')],
    },
    {
      name: t('itineraryEagles.features.meknesVisit'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: t('itineraryEagles.features.hammamRetreat'),
      availability: { Bronze: false, Silver: true, Gold: true },
      notes: [t('itineraryEagles.features.hammamNotesGold')],
    },
    {
      name: t('itineraryEagles.features.memento'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
  ];

  // NEW SUB ITINERARY
  const subFeatures = [
    {
      name: t('itineraryEagles.subFeatures.bedBreakfastExtended'),
    },
    {
      name: t('itineraryEagles.subFeatures.matchTicketsExtended'),
    },
    {
      name: t('itineraryEagles.subFeatures.chefchaouenTransfer'),
    },
    {
      name: t('itineraryEagles.subFeatures.akchourWaterfalls'),
    },
    {
      name: t('itineraryEagles.subFeatures.hassanIIMosque'),
    },
    {
      name: t('itineraryEagles.subFeatures.cornicheAinDiab'),
    },
    {
      name: t('itineraryEagles.subFeatures.beachDay'),
    },
    {
      name: t('itineraryEagles.subFeatures.shoppingMedina'),
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
        {t('itineraryEagles.mainTitle')}
      </h1>
      <p className="text-xl text-gray-600 text-center mb-10">
        {t('itineraryEagles.xmasSubtitle')}
      </p>

      {/* ===== MAIN ITINERARY (unchanged) ===== */}
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left">
                <span dangerouslySetInnerHTML={{ __html: t('itineraryEagles.mainItineraryHeader') }} />
              </th>
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
                      <Star size={12} className="mr-1" /> {t('common.mostPopular')}
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
                      <Check className="text-green-500 inline w-6 h-6" />
                    ) : (
                      <X className="text-red-500 inline w-6 h-6" />
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
        <div className="flex flex-col gap-3 items-center">
          <a
            href="https://forms.gle/vWe8gVGGWxBR8nc8A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            {t('common.reserveNow')} EN
          </a>
          <a
            href="https://forms.gle/yUyxWxyoqGSbz3u99"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            {t('common.reserveNow')} FN
          </a>
        </div>
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
                  // >>> Changed block: keep icon aligned on the right
                  <div key={idx} className="py-2">
                    <div className="flex items-start gap-3">
                      <span className="flex-1 text-sm leading-snug">
                        {feature.name}
                      </span>
                      {feature.availability[pkg.name] ? (
                        <Check className="text-green-500 w-6 h-6 shrink-0 mt-0.5" />
                      ) : (
                        <X className="text-red-500 w-6 h-6 shrink-0 mt-0.5" />
                      )}
                    </div>
                    {feature.notes && (
                      <ul className="list-disc pl-5 mt-1 text-gray-500 text-xs">
                        {feature.notes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  // <<< end changed block
                ))}
                <a
                  href="https://forms.gle/vWe8gVGGWxBR8nc8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  {t('common.reserveNow')} EN
                </a>
                <a
                  href="https://forms.gle/s7JjEsd1H63jWRw3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  {t('common.reserveNow')} FN
                  </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== SUB ITINERARY ===== */}
      <h2 className="text-2xl font-bold text-center mt-16 mb-6">
        {t('itineraryEagles.subItineraryTitle')}
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-gray-50 rounded-lg shadow-inner p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-200 p-4 text-left">
                <span dangerouslySetInnerHTML={{ __html: t('itineraryEagles.subItineraryHeader') }} />
              </th>
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
                  // >>> Changed block for sub-itinerary rows
                  <div key={idx} className="py-2">
                    <div className="flex items-start gap-3">
                      <span className="flex-1 text-sm leading-snug">
                        {feature.name}
                      </span>
                      <span className="text-gray-500 shrink-0 mt-0.5">—</span>
                    </div>
                  </div>
                  // <<< end changed block
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Download Itinerary Button */}
      <div className="mt-6 text-center">
        <a
          href="https://drive.google.com/file/d/1mm3DicExO7H_G9wrsyKwH74W975tBgYD/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 mb-4 md:mb-0 md:mr-6"
        >
          {t('common.downloadItineraryEN')}
        </a>
        <a
          href="https://drive.google.com/file/d/1qeRx-3QbbOdta9Capv5XNKjMAfwY6k3e/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          {t('common.downloadItineraryFR')}
        </a>
      </div>
    </div>
  );
};

export default ItineraryEagles;
