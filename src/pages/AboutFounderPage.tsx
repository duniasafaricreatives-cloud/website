import React from "react";

const AboutFounderPage = () => {
  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-12 text-center text-burgundy-900">
          About the Founder
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>

        {/* Founder Image + Intro */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <img
            src="/Mimi-Babs.jpg"
            alt="Founder of Dunia Safari"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Mimi Babs is an avid solo traveler who has explored over 20 countries across the globe, from Dubai to the United States to South Korea. With more than a decade of experience in sales, marketing and business development, she has consistently acted as an intrapreneur, raising hundreds of thousand to multi-million-dollar financing for the organizations she has worked with. 
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Travel is more than a passion for Mimi, it’s a way of life. She has journeyed across nearly every country in West Africa, mostly by road and always on a budget. A lover of nature and outdoor adventure. She often says her only regret is not beginning her adventures in her early twenties.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
            The Journey
          </h2>
          <p className="text-gray-700 leading-relaxed">
            In August 2025, Mimi founded Dunia Safari with a bold vision: to make travel accessible, to create a movement that demystifies traveling within Africa, and to inspire young people to explore their continent. She believes that for Africa to progress, its youth must see, experience, and advocate for the continent they call home. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            Mimi invites collaborations, partnerships, and sponsorships to help realize this dream within her lifetime. 
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
            My Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            My vision is to make Morocco accessible to everyone, whether
            you’re a football fan traveling for AFCON 2025, a solo explorer, or
            a group looking for a tailored experience. Dunia Safari is not just
            about tours, it’s about creating lifelong memories and building
            connections between cultures.
          </p
        </section>
      </div>
    </main>
  );
};

export default AboutFounderPage;
