import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
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
                Our Vision is to unite Africa by making authentic travel easy and affordable through curated bespoke journeys that connect people, cultures, and local businesses across the continent.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From stadium roars to desert stars, we specialize in curated experiences that celebrate both Africa’s biggest sporting events and Morocco’s timeless beauty.
                <br />
                <Link to="/about-founder" className="text-amber-600 hover:underline font-semibold">
                
                </Link>
              </p>
            </div>

            {/* What Makes Us Unique */}
            <div className="pt-8 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-burgundy-900">
                What Makes Us Unique
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-amber-600 mt-1" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-burgundy-900">TRUSTED & RELIABLE —</strong> 
                    We work with only vetted partners & licensed guides. We provide WhatsApp check-ins, clear meeting points, and practical tips. We remove the small frictions that make or break a trip.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-amber-600 mt-1" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-burgundy-900">BUDGET-SMART BESPOKE —</strong> 
                    We design custom itineraries that feel premium without the price tag. You see the total cost upfront, <em>no fluff!</em>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-amber-600 mt-1" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-burgundy-900">CURATED 3 ON 3 ITINERARY —</strong> 
               <br /> 
                    3 Adventure (e.g. desert safari, waterfalls, Atlas mountains, souk visits). <br />
                   3 Slow moments (e.g. Berber village visit, sunset walks, hammam, sea days).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/tourist.jpg"
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
