import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder for newsletter signup logic
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      // Show success message
    }, 2000);
  };

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-gradient-to-r from-burgundy-900 to-burgundy-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Signup to our Newsletter
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with latest AFCON 2025 packages, Morocco travel tips, and exclusive offers
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-amber-500 focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Subscribe
                </>
              )}
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-gray-400 mt-6">
          We respect your privacy and will never share your information
        </p>

        {/* Newsletter Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              [Exclusive Deals]
            </h3>
            <p className="text-gray-300 text-sm">
              [Benefit description placeholder]
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              [Travel Tips]
            </h3>
            <p className="text-gray-300 text-sm">
              [Benefit description placeholder]
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              [Early Access]
            </h3>
            <p className="text-gray-300 text-sm">
              [Benefit description placeholder]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;