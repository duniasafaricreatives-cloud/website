import React from 'react';
import { Users, MapPin, FileText, Camera, Utensils, Shield } from 'lucide-react';

const GroupPerks = () => {
  const perks = [
    {
      icon: Users,
      title: '[Shared Experiences]',
      description: '[Perk description placeholder for group activities and bonding]'
    },
    {
      icon: MapPin,
      title: '[Stadium Seating]',
      description: '[Perk description placeholder for preferred stadium locations]'
    },
    {
      icon: FileText,
      title: '[Visa Support]',
      description: '[Perk description placeholder for visa assistance and documentation]'
    },
    {
      icon: Camera,
      title: '[Photo Opportunities]',
      description: '[Perk description placeholder for exclusive photo sessions]'
    },
    {
      icon: Utensils,
      title: '[Group Dining]',
      description: '[Perk description placeholder for authentic Moroccan cuisine experiences]'
    },
    {
      icon: Shield,
      title: '[Travel Insurance]',
      description: '[Perk description placeholder for comprehensive coverage]'
    }
  ];

  return (
    <section id="group-perks" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-900 mb-4">
            [Group Travel Perks Title]
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            [Group perks section description placeholder - Why traveling with Dunia Safari groups enhances your experience]
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

        {/* Bottom Section */}
        <div className="mt-16 bg-gradient-to-r from-burgundy-900 to-burgundy-800 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            [Join Our Travel Community Title]
          </h3>
          <p className="text-xl mb-8 opacity-90">
            [Community description placeholder - Connect with fellow travelers and create lasting memories]
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              [Join Community CTA]
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-burgundy-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              [Learn More CTA]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupPerks;