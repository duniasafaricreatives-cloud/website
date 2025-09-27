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
      answer: `
        <p><strong>Book early</strong> — Christmas/New Year has high demand and higher rates.</p>
        <p><strong>Steps:</strong></p>
        <ol>
          <li>1. Select your package on the website & pay 40% deposit.</li>
          <li>2. A travel agent will contact you via WhatsApp within 24 hours for flights, insurance & visa support.</li>
          <li>3. Pay the remaining 60% before the deadline to receive flight, hotel & stadium ticket confirmations.</li>
          <li>4. Be added to our WhatsApp broadcast group for updates.</li>
        </ol>
      `
    },
    {
      question: 'Visa Requirements (Ghana, Côte d’Ivoire, Nigeria)',
answer: `
  <p><strong>Q:</strong> — For Ghanaian passport holders.</p>
  <p><strong>A:</strong> — No visa required. You must complete Morocco’s Electronic Travel Authorization 
  (<a href="https://rabat.ghanagovernmentmission.com/portal/" target="_blank" rel="noopener noreferrer">
  Accès Maroc</a>) online before travel (typically processed within ~24 hours).</p>

  <p><strong>Q:</strong> — For Ivorian & Nigerian passport holders.</p>
  <p><strong>A:</strong> — Yes, Visa required. If you hold a valid Schengen/US/UK/Canada visa or residence permit, you can 
  usually apply online for a Morocco eVisa.</p>

  <p>Otherwise, apply at the Moroccan consulate in Abidjan & Abuja</p>
  <p>Typical Visa processing is around 10 business days, but you need to secure your visa appointment 
  at least 3 weeks in advance</p>
`    
    },
    {
      question: 'What payment methods do you accept?',
      answer:`
  <p><strong>A:</strong> — We accept debit/credit cards (Visa/Mastercard), bank transfer, and mobile money (for Ghana only). If your preferred method isn’t listed, contact our travel agent for alternatives.</p>
  <p><strong>Q:</strong> —How are exchange rates handled?</p>
  <p><strong>A:</strong> — For cross-currency payments, we use the prevailing market rate at the time of invoicing/checkout. Your bank or provider may apply a small FX margin.</p>
  <p><strong>Q:</strong> — Will I receive a receipt?</p>
  <p><strong>A:</strong> — Yes. Reciept are issued within 24hours after each payment, and a final confirmation pack (flights/rooms/match tickets) is sent once the balance is paid.</p>
  <p><strong>Q:</strong> — What if I miss a payment deadline?.</p>
  <p><strong>A:</strong> — Contact us immediately—our agent will advise on the best next step.</p>
`
    },
    {
      question: 'What is the difference between the Bronze, Silver, and Gold packages?',
      answer: 'The Bronze Package offers room sharing in a riad or hostel and the essential AFCON travel experience. The Silver and Gold Packages upgrade you to private rooms in 2-star and 3-star hotels, respectively, and include added experiences such as a hammam spa and visa application support. For full details, please refer to the individual package descriptions.'
    },
    {
      question: 'Do you only operate in Morocco?',
      answer: 'Our launch focus is Morocco. Especially trips aligned with AFCON 2025 and holiday packages, but our long-term vision includes Egypt, Cape Verde, Turkey, and other exciting destinations across the world'
    },
    {
      question: 'What is Dunia Safari’s refund policy?',
      answer: 'Deposits are generally non-refundable, as they secure your flight, hotel, and match tickets. Depending on the situation, Dunia Safari may reschedule your booking to a later date or allow you to transfer your package to another traveler if you are unable to travel yourself. Terms & conditions apply.'
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
                  <div 
                    className="text-gray-600 leading-relaxed prose prose-lg max-w-none prose-ol:pl-4 prose-li:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
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