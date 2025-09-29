import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "AFCON 2025: Which Team Are You Supporting?",
      subtitle: "Your Morocco Adventure Awaits",
      image: "https://images.unsplash.com/photo-1587368062478-e804f5e2a55a?q=80&w=1023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg" // stadium crowd
    },
    {
      id: 2,
      title: "Experience Morocco Beyond Football",
      subtitle: "From Sahara dunes to Atlas peaks, adventure meets culture.",
      image: "https://images.pexels.com/photos/31653067/pexels-photo-31653067.jpeg" // desert sunset
    },
    {
      id: 3,
      title: "Dive Into Moroccan Culture",
      subtitle: "Souks, lanterns, and flavors you’ll never forget.",
      image: "https://images.pexels.com/photos/15157857/pexels-photo-15157857.jpeg" // Marrakech souk
    },
    {
      id: 4,
      title: "Nature Awaits You",
      subtitle: "Hike the Atlas mountains and explore Morocco’s beauty.",
      image: "https://images.unsplash.com/photo-1676475013461-79b08ac45f57?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg" // Atlas peaks
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      id="home" 
      className="relative h-[65vh] sm:h-[75vh] md:h-screen overflow-hidden"
    >
      {/* Slideshow */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mt-8 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-8 opacity-90 leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA - View Itinerary */}
            <a 
              href="https://drive.google.com/file/d/10-3Pc0HBj23eY4CdVyCkr6Z18Z7vFd6Y/view?usp=sharing"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white 
                         px-4 py-2 sm:px-6 sm:py-3 
                         rounded-full font-semibold 
                         text-sm sm:text-lg 
                         transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Itinerary
            </a>

            {/* Optional - Direct Download */}
            <a 
              href="https://wa.me/233538087709" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-900 hover:bg-gray-200 
                         px-4 py-2 sm:px-6 sm:py-3 
                         rounded-full font-semibold 
                         text-sm sm:text-lg 
                         transition-all duration-300 transform hover:scale-105 shadow-lg"
            > 
              Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (hidden on mobile) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
