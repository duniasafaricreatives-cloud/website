import React, { useState, useEffect } from "react";
import { Check, X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

// Type definitions
interface Tier {
  id: number;
  name: string;
  price: number;
  discount_price: number | null;
  max_participants: number;
  visa_application: boolean;
  return_flights: boolean;
  fez_casablanca_train: boolean;
  hotel_shuttle: boolean;
  bed_and_breakfast: boolean;
  city_taxes_included: boolean;
  welcome_dinner: boolean;
  official_match_tickets: boolean;
  desert_camping: boolean;
  meknes_volubilis_tour: boolean;
  hammam_retreat: boolean;
  dunia_safari_memento: boolean;
}

interface ApiPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  specials: string[];
  color: string;
  duration_days: number;
  is_active: boolean;
  created_at: string;
  tiers: Tier[];
}

const ItineraryDynamic: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  // ✅ FIX: Match the route parameter name in App.tsx
  const { packageId } = useParams<{ packageId: string }>();
  
  const [packageData, setPackageData] = useState<ApiPackage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openPackage, setOpenPackage] = useState<string | null>(null);

  // Handle Book Now button click
  const handleBookNow = (tier: Tier) => {
    if (!packageData) return;

    // Check if user is authenticated
    if (!user) {
      // Open auth modal if user is not logged in
      if (openAuthModal) {
        openAuthModal();
      } else {
        // Fallback: redirect to home with hash to trigger modal
        navigate('/#login');
      }
      return;
    }

    // Prepare booking data to pass to booking page
    const bookingData = {
      package_id: packageData.id,
      package_name: packageData.name,
      package_tier_id: tier.id,
      tier_name: tier.name,
      price: tier.discount_price || tier.price,
      original_price: tier.price,
      discount_price: tier.discount_price,
      max_participants: tier.max_participants,
    };

    // Navigate to booking page with state
    navigate('/booking', { state: bookingData });
  };

  // Fetch package by ID
  useEffect(() => {
    const fetchPackage = async (): Promise<void> => {
      try {
        setLoading(true);
        console.log('Fetching package with ID:', packageId); // Debug log
        console.log('API URL:', `${API_BASE}/packages/${packageId}`); // Debug log
        
        const response = await fetch(`${API_BASE}/packages/${packageId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // ✅ FIX: Handle response as single object, not array
        const data: ApiPackage = await response.json();
        console.log('Received data:', data); // Debug log
        
        setPackageData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching package:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackage();
    } else {
      setError('No package ID provided');
      setLoading(false);
    }
  }, [packageId]);

  // Check for pending booking after user logs in
  useEffect(() => {
    if (user && packageData) {
      const pendingBookingStr = sessionStorage.getItem('pendingBooking');
      if (pendingBookingStr) {
        try {
          const pendingBooking = JSON.parse(pendingBookingStr);
          // Check if the pending booking matches current package
          if (pendingBooking.package_id === packageData.id) {
            sessionStorage.removeItem('pendingBooking');
            // Find the tier and proceed with booking
            const tier = packageData.tiers.find(t => t.id === pendingBooking.package_tier_id);
            if (tier) {
              // Small delay to ensure component is ready
              setTimeout(() => handleBookNow(tier), 100);
            }
          }
        } catch (err) {
          console.error('Error processing pending booking:', err);
          sessionStorage.removeItem('pendingBooking');
        }
      }
    }
  }, [user, packageData]);

  const toggleAccordion = (tierName: string) => {
    setOpenPackage(openPackage === tierName ? null : tierName);
  };

  // Build features list from tier data
  const buildFeatures = () => {
    if (!packageData?.tiers || packageData.tiers.length === 0) return [];

    return [
      {
        name: t('itineraryEagles.features.visaGhana'),
        key: 'visa_application',
      },
      {
        name: t('itineraryStars.features.returnFlights'),
        key: 'return_flights',
      },
      {
        name: t('itineraryEagles.features.trainConnections'),
        key: 'fez_casablanca_train',
      },
      {
        name: t('itineraryEagles.features.hotelShuttle'),
        key: 'hotel_shuttle',
      },
      {
        name: t('itineraryEagles.features.bedBreakfast'),
        key: 'bed_and_breakfast',
      },
      {
        name: t('itineraryEagles.features.cityTax'),
        key: 'city_taxes_included',
      },
      {
        name: t('itineraryEagles.features.welcomeDinner'),
        key: 'welcome_dinner',
      },
      {
        name: t('itineraryEagles.features.matchTickets'),
        key: 'official_match_tickets',
      },
      {
        name: t('itineraryEagles.features.desertSafari'),
        key: 'desert_camping',
      },
      {
        name: t('itineraryEagles.features.meknesVisit'),
        key: 'meknes_volubilis_tour',
      },
      {
        name: t('itineraryEagles.features.hammamRetreat'),
        key: 'hammam_retreat',
      },
      {
        name: t('itineraryEagles.features.memento'),
        key: 'dunia_safari_memento',
      },
    ];
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600">
          <p className="text-xl">Loading package details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          <p className="text-xl">Error loading package: {error}</p>
          <p className="text-sm mt-2">Package ID: {packageId}</p>
          <p className="text-sm">API Base: {API_BASE}</p>
        </div>
      </div>
    );
  }

  // No package found
  if (!packageData) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600">
          <p className="text-xl">Package not found</p>
        </div>
      </div>
    );
  }

  const features = buildFeatures();
  const tiers = packageData.tiers || [];

  // Determine the most popular tier (middle one)
  const popularTierIndex = Math.floor(tiers.length / 2);

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 mt-12">
        {packageData.name}
      </h1>
      <p className="text-xl text-gray-600 text-center mb-10">
        {packageData.description}
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 text-left">
                <span>Features</span>
              </th>
              {tiers.map((tier, index) => (
                <th
                  key={tier.id}
                  className={`p-4 text-center relative ${
                    index === popularTierIndex
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {tier.name}
                  <div className="text-sm font-normal">
                    ${tier.discount_price || tier.price}
                    {tier.discount_price && (
                      <span className="ml-2 line-through text-xs opacity-70">
                        ${tier.price}
                      </span>
                    )}
                  </div>
                  {index === popularTierIndex && (
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
                <td className="p-4 text-sm">{feature.name}</td>
                {tiers.map((tier) => (
                  <td key={tier.id} className="text-center p-4">
                    {tier[feature.key as keyof Tier] ? (
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
              {tiers.map((tier) => (
                <td key={tier.id} className="p-4 text-center">
                  <div className="flex flex-col gap-3 items-center">
                    <button
                      onClick={() => handleBookNow(tier)}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
                    >
                      Book Now
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4 mt-6">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(tier.name)}
              className={`w-full flex justify-between items-center p-4 ${
                index === popularTierIndex
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="text-sm">
                  ${tier.discount_price || tier.price}
                  {tier.discount_price && (
                    <span className="ml-2 line-through text-xs opacity-70">
                      ${tier.price}
                    </span>
                  )}
                </p>
              </div>
              {openPackage === tier.name ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openPackage === tier.name && (
              <div className="p-4 bg-white space-y-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="py-2">
                    <div className="flex items-start gap-3">
                      <span className="flex-1 text-sm leading-snug">
                        {feature.name}
                      </span>
                      {tier[feature.key as keyof Tier] ? (
                        <Check className="text-green-500 w-6 h-6 shrink-0 mt-0.5" />
                      ) : (
                        <X className="text-red-500 w-6 h-6 shrink-0 mt-0.5" />
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleBookNow(tier)}
                  className="block w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  Book Now
                </button>
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

export default ItineraryDynamic;