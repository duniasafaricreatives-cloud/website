import React from 'react';
import { Users, MapPin, FileText, Camera, Utensils, Shield } from 'lucide-react';

const GroupPerks = () => {
  const perks = [
    {
      icon: Users,
      title: 'Shared Experiences',
      description: 'Traveling as a group makes every moment richer — from cheering together at AFCON stadiums to bonding over desert sunsets and city adventures.'
    },
    {
      icon: MapPin,
      title: 'Exclusive Discounts',
      description: ' Enjoy lower rates on flights, hotels, and experiences when you travel as part of a group.'
    },
    {
      icon: FileText,
      title: 'Visa Support',
      description: 'Skip the stress — our team guides your group through the entire visa application process with clear steps and reliable documentation support.'
    },
    {
  ];

  return (
    <section id="group-perks" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-900 mb-4">
            Group Travel Perks
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Why traveling with Dunia Safari groups enhances your experience
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map((perk, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <perk.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {perk.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupPerks;