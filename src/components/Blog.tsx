import React from "react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Top 5 Things to Do in Marrakech During AFCON 2025",
      excerpt: "From stadium roars to desert nights, here’s your guide to the best experiences…",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
    },
    {
      id: 2,
      title: "Why Morocco is Africa’s Ultimate Holiday Destination",
      excerpt: "Culture, cuisine, and coastlines — discover why Morocco should be on your bucket list.",
      image: "https://images.pexels.com/photos/1309596/pexels-photo-1309596.jpeg"
    },
    {
      id: 3,
      title: "Group Travel Hacks for AFCON Fans",
      excerpt: "Save more, bond more, and experience AFCON together with these travel hacks.",
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          The Safari Journal
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-amber-600 font-semibold hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
