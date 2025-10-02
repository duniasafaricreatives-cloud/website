import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
  const { t, i18n } = useTranslation();
  // Show only the first 3 posts on the homepage
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t('blog.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={i18n.language === 'fr' && post.title_fr ? post.title_fr : post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {i18n.language === 'fr' && post.title_fr ? post.title_fr : post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'fr' && post.excerpt_fr ? post.excerpt_fr : post.excerpt}
                </p>
                <Link
                  to="/blog"
                  className="text-amber-600 font-semibold hover:underline"
                >
                  {t('blog.readMore')} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
