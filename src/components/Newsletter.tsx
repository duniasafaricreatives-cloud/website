import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    setSuccess(false);

    try {
      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbw8PHbzDRFDpZEkz0HiAnnrBKdKX2Nir7N98cMXTWDfPRdRHdDQ2952Wx77bsCfbKr0Jw/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setEmail('');
        setSuccess(true);
        timeoutRef.current = window.setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(true);
        timeoutRef.current = window.setTimeout(() => setError(false), 4000);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      timeoutRef.current = window.setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-gradient-to-r from-burgundy-900 to-burgundy-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('newsletter.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
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
                  {t('newsletter.subscribe')}
                </>
              )}
            </button>
          </div>

          {success && (
            <p className="text-green-400 mt-4 text-sm font-medium">
              {t('newsletter.successMessage')}
            </p>
          )}

          {error && (
            <p className="text-red-400 mt-4 text-sm font-medium">
              {t('newsletter.errorMessage')}
            </p>
          )}
        </form>

        <p className="text-sm text-gray-400 mt-6">
          {t('newsletter.privacyNote')}
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
