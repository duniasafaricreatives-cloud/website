import React, { useState, useEffect } from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_BASE } from "../config";

// Type definitions
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
}

interface PackageDisplay {
  id: number;
  name: string;
  popular: boolean;
  price: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}


const Packages: React.FC = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState<PackageDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to determine background color alternation
  const getBgColor = (index: number): string => {
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  };

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/packages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiPackage[] = await response.json();
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        
        // Filter only active packages and map to component format
        const activePackages: PackageDisplay[] = data
          .filter((pkg: ApiPackage) => pkg?.is_active === true)
          .map((pkg: ApiPackage, index: number) => {
            return {
              id: pkg.id || index,
              name: pkg.name || 'Unnamed Package',
              popular: index === 1, // Middle package is popular, adjust logic as needed
              price: `${t('packages.startingFrom')} ${pkg.price || 0}`,
              description: pkg.description || t('packages.excludesFlights'),
              features: Array.isArray(pkg.specials) ? pkg.specials : [], // specials become features
              color: pkg.color || 'from-gray-600 to-gray-700', // Use color from database
              bgColor: getBgColor(index) // Alternate background colors
            };
          });

        setPackages(activePackages);
        setError(null);
      } catch (err) {
        console.error('Error fetching packages:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [t]);

  // Loading state
  if (loading) {
    return (
      <section id="packages" className="py-16 md:py-24 bg-burgundy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="text-xl">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="packages" className="py-16 md:py-24 bg-burgundy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="text-xl text-red-400">Error loading packages: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // No packages state
  if (packages.length === 0) {
    return (
      <section id="packages" className="py-16 md:py-24 bg-burgundy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="text-xl">No packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-16 md:py-24 bg-burgundy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('packages.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('packages.subtitle')}
          </p>
          <p className="text-lg text-amber-600 max-w-3xl mx-auto mt-2 font-medium">
            <em>{t('packages.offerEnds')}</em>
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {packages.map((pkg: PackageDisplay) => (
            <div
            

              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                pkg.popular ? 'ring-4 ring-amber-500' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 rounded-bl-lg font-semibold text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {t('packages.mostPopular')}
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div 
                
                className="text-center mb-8">
                  <div
                  style={{backgroundColor: pkg.color,}}
              className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${pkg.color} text-white font-bold text-lg mb-4`}>
                    {pkg.name}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features && pkg.features.length > 0 ? (
                    pkg.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No features listed</p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to={`/ItineraryDynamic/${pkg.id}`}
                  style={{backgroundColor: pkg.color,}}
                  className={`block text-center bg-gradient-to-r ${pkg.color} text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                >
                  {t('packages.seePackages')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* New Download Itinerary CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-100 text-lg mb-4 gap-4">
            Download Itinerary
          </p>
          <a
            href="https://drive.google.com/file/d/1mm3DicExO7H_G9wrsyKwH74W975tBgYD/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 mb-4 md:mb-0 md:mr-6"
          >
            Download EN
          </a>

          <a
            href="https://drive.google.com/file/d/1qeRx-3QbbOdta9Capv5XNKjMAfwY6k3e/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300"
          >
            Download FN
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-300 mb-6">
            Custom Package
          </p>
          <a
            href="https://forms.gle/5eCVqkXjoKoorqBQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-burgundy-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 mb-4 md:mb-0 md:mr-6"
          >
            Custom Inquiry EN
          </a>
          <a
            href="https://forms.gle/2d1RBwgdJxZzhG6q7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-burgundy-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Custom Inquiry FN
          </a>
        </div>
      </div>
    </section>
  );
};

export default Packages;