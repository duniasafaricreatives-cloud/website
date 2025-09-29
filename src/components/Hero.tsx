import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1587368062478-e804f5e2a55a?q=80&w=1023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // 🔹 Replace with your actual image
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Which team are you traveling with to AFCON 2025?
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
          Choose your team and we’ll show you the perfect AFCON travel package
          just for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Nigeria */}
          <Link
            to="/itinerary/eagles-over-the-atlas"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:scale-105 transform transition"
          >
            Nigeria
          </Link>

          {/* Ivory Coast */}
          <Link
            to="/itinerary/elephants-in-the-atlas"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 transform transition"
          >
            Ivory Coast
          </Link>

          {/* Tanzania */}
          <Link
            to="/itinerary/stars-in-the-atlas"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 transform transition"
          >
            Tanzania
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
