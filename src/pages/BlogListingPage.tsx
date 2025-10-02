import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { useTranslation } from "react-i18next";

const BlogListingPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center text-burgundy-900">
          {t('blog.title')}
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
                  <span>{new Date(post.publishDate).toLocaleDateString(i18n.language)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'fr' && post.excerpt_fr ? post.excerpt_fr : post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
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

export default BlogListingPage;
