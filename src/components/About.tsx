import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-900 mb-4">
                Dunia Safari Tours
              </h2>
              <div className="w-24 h-1 bg-amber-600 mb-6"></div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Dunia Safari, we believe travel should be accessible, authentic, value packed and transformative.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our journeys blend cultural immersion with comfort and affordability, giving you more than just a trip. We create stories you’ll carry for a lifetime.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From stadium roars to desert stars, we specialize in curated experiences that celebrate both Africa’s biggest sporting events and Morocco’s timeless beauty.
              </p>
            </div>


          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg"
                alt="About Dunia Safari"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-200 rounded-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-burgundy-200 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;