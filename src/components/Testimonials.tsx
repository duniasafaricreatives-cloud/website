import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.items.testimonial1.name'),
      rating: 5,
      text: t('testimonials.items.testimonial1.text'),
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
    },
    {
      id: 2,
      name: t('testimonials.items.testimonial2.name'),
      rating: 5,
      text: t('testimonials.items.testimonial2.text'),
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      id: 3,
      name: t('testimonials.items.testimonial3.name'),
      rating: 5,
      text: t('testimonials.items.testimonial3.text'),
      image: 'https://images.unsplash.com/photo-1598966739654-5e9a252d8c32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-burgundy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-2">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-500 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* Author */}
                <div>
                  <h4 className="text-xl font-bold text-burgundy-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-500">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 text-burgundy-900 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 text-burgundy-900 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-amber-500' : 'bg-white bg-opacity-40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;