import React from "react";

const BlogPage = () => {
  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Inspiration Hub – The Safari Journal
        </h1>

        <article className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Sahara Desert</h2>
          <p className="mb-4">
            Imagine riding a camel as the sun sets, the sky turning orange and pink, shadows dancing across the sand...
          </p>
          <img
            src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
            alt="Sahara Desert"
            className="rounded-lg shadow-md mb-6"
          />
        </article>

        {/* Repeat sections for Marrakech, Atlas Mountains, etc. */}

        <div className="bg-amber-100 p-8 rounded-lg text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Subscribe to The Safari Journal</h3>
          <p className="mb-6">Get inspiring travel diaries and exclusive travel deals straight to your inbox.</p>
          <button className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold">
            Subscribe Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
