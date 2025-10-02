import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogPosts } from "../data/blogPosts";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

const BlogPostPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <main className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-8 text-burgundy-900">
            {t('blog.postNotFoundTitle')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('blog.postNotFoundMessage')}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back to Blog Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-burgundy-900 hover:text-burgundy-700 font-semibold mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('blog.backToBlog')}
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={post.image}
              alt={i18n.language === 'fr' && post.title_fr ? post.title_fr : post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-900 mb-6 leading-tight">
              {i18n.language === 'fr' && post.title_fr ? post.title_fr : post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-burgundy-900 prose-links:text-amber-600 prose-links:hover:text-amber-700"
              dangerouslySetInnerHTML={{ 
                __html: i18n.language === 'fr' && post.content_fr ? post.content_fr : post.content 
              }}
            />
          </div>
        </article>

        {/* Related Posts or CTA */}
        <div className="mt-12 text-center">
          <div className="bg-burgundy-900 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">{t('blog.readyForAdventureTitle')}</h3>
            <p className="text-gray-300 mb-6">
              {t('blog.readyForAdventureMessage')}
            </p>
            <Link
              to="/#packages"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              {t('blog.viewPackages')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
