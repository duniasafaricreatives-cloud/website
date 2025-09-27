import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What games do the AFCON packages cover?',
      answer: 'Our packages include 2 games in Fes or Marrakech for Nigerian and Ivorian fans respectively, blending football with culture and exploration. Want 3 games plus New Year in Morocco? Contact our travel agent for the extended itinerary. We also have a 3 city-3 game package (Casa, Fes, Marrakech circuit)'
    },
    {
      question: 'About booking process',
      answer: '[FAQ Answer 2 placeholder - Step-by-step guide on how to book your travel package with Dunia Safari]'
    },
    {
      question: 'About visa requirements',
      answer: '[FAQ Answer 3 placeholder - Information about visa requirements for Morocco and our support services]'
    },
    {
      question: 'About group travel',
      answer: '[FAQ Answer 4 placeholder - Benefits and details of traveling with Dunia Safari groups]'
    },
    {
      question: 'About payment options',
      answer: '[FAQ Answer 5 placeholder - Available payment methods and payment schedule information]'
    },
    {
      question: 'About cancellation policy',
      answer: '[FAQ Answer 6 placeholder - Our cancellation and refund policy details]'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Find answers to common questions about AFCON 2025 travel packages
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <Minus className="w-6 h-6 text-burgundy-900" />
                  ) : (
                    <Plus className="w-6 h-6 text-burgundy-900" />
                  )}
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="p-6 pt-0 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <button className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
          <a
  href="tel:+233538087709"
  className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
>
  Contact Support
</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;