import React from "react";

const AboutFounderPage = () => {
  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-12 text-center text-burgundy-900">
          About the Founder
        </h1>

        {/* Founder Image + Intro */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="/founder.jpg" // 👈 replace with actual founder image in your public/ folder
            alt="Founder of Dunia Safari"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <p className="text-lg text-gray-700 leading-relaxed">
            Hi, I’m [Founder’s Name], the visionary behind Dunia Safari Tours.
            My passion for connecting people through authentic travel 
            experiences inspired me to create journeys that celebrate Morocco’s
            culture, beauty, and spirit. With years of experience in [tourism /
            travel / hospitality], I believe travel is more than movement — 
            it’s a way to bond, learn, and grow.
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
            The Journey
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Dunia Safari was founded with a simple belief: travel should be
            authentic, affordable, and unforgettable. From the busy souks of
            Marrakech to the quiet dunes of the Sahara, I wanted to curate
            experiences that immerse visitors in the real Morocco. Every package
            is designed with care, balancing adventure, culture, and comfort.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
            My Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            My vision is to make Morocco accessible to everyone — whether
            you’re a football fan traveling for AFCON 2025, a solo explorer, or
            a group looking for a tailored experience. Dunia Safari is not just
            about tours, it’s about creating lifelong memories and building
            connections between cultures.
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutFounderPage;
