import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ItineraryStars = () => {
  const { t } = useTranslation();
  
  const packages = [
    { name: t('itineraryStars.bronzePackageName'), price: t('itineraryStars.bronzePackagePrice'), popular: false },
    { name: t('itineraryStars.silverPackageName'), price: t('itineraryStars.silverPackagePrice'), popular: true },
    { name: t('itineraryStars.goldPackageName'), price: t('itineraryStars.goldPackagePrice'), popular: false },
  ];

  const features = [
    {
      name: t('itineraryStars.features.visaTanzania'),
      availability: { Bronze: false, Silver: false, Gold: true },
    },
    { name: t('itineraryStars.features.returnFlights'), availability: { Bronze: false, Silver: false, Gold: false } },
    {
      name: t('itineraryStars.features.trainConnections'),
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [t('itineraryStars.features.trainNotesGold')],
    },
    { name: t('itineraryStars.features.hotelShuttle'), availability: { Bronze: true, Silver: true, Gold: true } },
    { name: t('itineraryStars.features.welcomeDinner'), availability: { Bronze: true, Silver: true, Gold: true } },
    {
      name: t('itineraryStars.features.bedBreakfast'),
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [
        t('itineraryStars.features.bedBreakfastNotesBronze'),
        t('itineraryStars.features.bedBreakfastNotesSilver'),
        t('itineraryStars.features.bedBreakfastNotesGold'),
      ],
    },
    { name: t('itineraryStars.features.cityTax'), availability: { Bronze: true, Silver: true, Gold: true } },
    {
      name: t('itineraryStars.features.matchTickets'),
      availability: { Bronze: true, Silver: true, Gold: true },
    },
    {
      name: t('itineraryStars.features.desertSafari'),
      availability: { Bronze: true, Silver: true, Gold: true },
      notes: [t('itineraryStars.features.desertSafariNotesGold')],
    },
    { name: t('itineraryStars.features.meknesVisit'), availability: { Bronze: true, Silver: true, Gold: true } },
    { name: t('itineraryStars.features.kasbahOudayas'), availability: { Bronze: true, Silver: true, Gold: true } },
    { name: t('itineraryStars.features.eveningCocktail'), availability: { Bronze: false, Silver: true, Gold: true } },
    {
      name: t('itineraryStars.features.hammamRetreat'),
      availability: { Bronze: false, Silver: true, Gold: true },
      notes: [t('itineraryStars.features.hammamNotesGold')],
    },
    { name: t('itineraryStars.features.memento'), availability: { Bronze: true, Silver: true, Gold: true } },
  ];

  // Sub-itinerary features
  const subFeatures = [
    { name: t('itineraryStars.subFeatures.bedBreakfastExtended') },
    { name: t('itineraryStars.subFeatures.matchTicketsExtended') },
    { name: t('itineraryStars.subFeatures.rabatShopping') },
    { name: t('itineraryStars.subFeatures.beachRestaurant') },
    { name: t('itineraryStars.subFeatures.rabatCorniche') },
    { name: t('itineraryStars.subFeatures.gastronomicalDinner') },
    { name: t('itineraryStars.subFeatures.saleTown') },
    { name: t('itineraryStars.subFeatures.newYearParty') },
    { name: t('itineraryStars.subFeatures.casablancaActivities') },
  ];

  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const [openSubPackage, setOpenSubPackage] = useState<string | null>(null);

  const toggleAccordion = (pkg: string) => setOpenPackage(openPackage === pkg ? null : pkg);
  const toggleSubAccordion = (pkg: string) => setOpenSubPackage(openSubPackage === pkg ? null : pkg);

  return (
    <div className="p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mt-16">
        {t('itineraryStars.mainTitle')}
      </h1>
      <p className="text-xl text-gray-600 text-center mb-10">
        {t('itineraryStars.xmasSubtitle')}
      </p>

      {/* MAIN ITINERARY */}
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left">
                <span dangerouslySetInnerHTML={{ __html: t('itineraryStars.mainItineraryHeader') }} />
              </th>
              {packages.map((pkg) => (
                <th
                  key={pkg.name}
                  className={`p-4 text-center ${
                    pkg.popular
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {pkg.name}
                  <div className="text-sm font-normal">{pkg.price}</div>
                  {pkg.popular && (
                    <div className="mt-2 inline-flex items-center bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold rounded-full">
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
                      <Check className="text-green-500 inline" size={20} />
                    ) : (
                      <X className="text-red-500 inline" size={20} />
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
                    href="https://forms.gle/vWe8gVGGWxBR8nc8A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {t('common.reserveNow')} EN
                  </a>
                  <a
                    href="https://forms.gle/yUyxWxyoqGSbz3u99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {t('common.reserveNow')} FN
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
                  <div className="mt-2 inline-flex items-center bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold rounded-full">
                    <Star size={12} className="mr-1" /> {t('common.mostPopular')}
                  </div>
                )}
              </div>
              {openPackage === pkg.name ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openPackage === pkg.name && (
              <div className="p-4 bg-white space-y-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="py-2">
                    <div className="flex items-start gap-3">
                      <span className="flex-1 text-sm leading-snug">
                        {feature.name}
                      </span>
                      {feature.availability[pkg.name] ? (
                        <Check className="text-green-500 shrink-0 mt-0.5" size={20} />
                      ) : (
                        <X className="text-red-500 shrink-0 mt-0.5" size={20} />
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
                ))}
                <a 
                  href="https://forms.gle/vWe8gVGGWxBR8nc8A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  {t('common.reserveNow')}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SUB-ITINERARY */}
      <h2 className="text-2xl font-bold text-center mt-16 mb-8">
        {t('itineraryStars.subItineraryTitle')}
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left">
                <span dangerouslySetInnerHTML={{ __html: t('itineraryStars.subItineraryHeader') }} />
              </th>
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
                  <td key={pkg.name} className="text-center p-4">—</td>
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
              onClick={() => toggleSubAccordion(pkg.name)}
              className="w-full flex justify-between items-center p-4 bg-gray-100"
            >
              <h3 className="text-lg font-semibold">{pkg.name} ({t('common.extended')})</h3>
              {openSubPackage === pkg.name ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSubPackage === pkg.name && (
              <div className="p-4 bg-white space-y-3">
                {subFeatures.map((feature, idx) => (
                  <div key={idx} className="py-2">
                    <div className="flex items-start gap-3">
                      <span className="flex-1 text-sm leading-snug">
                        {feature.name}
                      </span>
                      <span className="text-gray-500 shrink-0 mt-0.5">—</span>
                    </div>
                  </div>
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

export default ItineraryStars;
