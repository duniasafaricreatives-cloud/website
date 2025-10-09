import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Users, DollarSign } from 'lucide-react';

const AffiliatesPage = () => {
  const { t } = useTranslation();

  const SHEET_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbzKKH_GuRgs6UFZH9xSo_0gSLra5DWBAMi2-BcDewX4Q1_j1Z1Tz2BPcxl3EbcLe_5b/exec';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    socialMediaHandles: '',
    followerCount: '',
    contentTypes: [] as string[],
    contentTypesOther: '',
    audienceDescription: '',
    previousExperience: '',
    previousExperienceOther: '',
    whyJoin: '',
    additionalInfo: '',
    supportNeeded: [] as string[],
    supportNeededOther: '',
    commissionAcknowledgement: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      contentTypes: checked 
        ? [...prev.contentTypes, value]
        : prev.contentTypes.filter(type => type !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const payload = {
      ...formData,
      contentTypes: Array.isArray(formData.contentTypes) ? formData.contentTypes.join(', ') : formData.contentTypes,
      supportNeeded: Array.isArray(formData.supportNeeded) ? formData.supportNeeded.join(', ') : formData.supportNeeded,
    };

    try {
      const response = await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage(t('affiliates.form.successMessage'));
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          socialMediaHandles: '',
          followerCount: '',
          contentTypes: [],
          contentTypesOther: '',
          audienceDescription: '',
          previousExperience: '',
          previousExperienceOther: '',
          whyJoin: '',
          additionalInfo: '',
          supportNeeded: [],
          supportNeededOther: '',
          commissionAcknowledgement: ''
        });
      } else throw new Error('Submission failed');
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage(t('affiliates.form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { icon: Users, title: t('affiliates.steps.step1.title'), description: t('affiliates.steps.step1.description') },
    { icon: CheckCircle, title: t('affiliates.steps.step2.title'), description: t('affiliates.steps.step2.description') },
    { icon: DollarSign, title: t('affiliates.steps.step3.title'), description: t('affiliates.steps.step3.description') }
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative mt-16">
        <div
          className="w-full h-[40vh] sm:h-[52vh] md:h-[65vh] bg-no-repeat bg-contain md:bg-cover bg-center"
          style={{ backgroundImage: "url('/my-affiliate-hero.jpg')" }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <h1 className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-6xl mb-4 md:mb-6 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              {t('affiliates.hero.title')}
            </h1>
            <p className="text-white/95 text-lg sm:text-xl md:text-2xl [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
              {t('affiliates.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Three-Step Process */}
      <section className="pt-6 pb-12 md:py-16 bg-cream-50 -mt-6 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">{t('affiliates.process.title')}</h2>
          <div className="w-24 h-1 bg-warm-yellow mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-green rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-burgundy-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 Our Affiliates Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">Our Affiliates</h2>
          <div className="w-24 h-1 bg-warm-yellow mx-auto mb-10"></div>
          <p className="text-gray-700 text-lg mb-12">
            We’re proud to partner with amazing brands who share our vision of inspiring travel experiences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center justify-center">
            {[
              { src: '/affiliates/placeholder1.png', alt: 'Affiliate 1', name: 'Brand One' },
              { src: '/affiliates/placeholder2.png', alt: 'Affiliate 2', name: 'Brand Two' },
            ].map((affiliate, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-4">
                <img
                  src={affiliate.src}
                  alt={affiliate.alt}
                  className="max-h-24 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <p className="font-semibold text-gray-800">{affiliate.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              {t('affiliates.form.title')}
            </h2>
            <div className="w-24 h-1 bg-warm-yellow mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">{t('affiliates.form.subtitle')}</p>
          </div>

          {/* FULL FORM */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.fullName')} *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.fullName')}
              />
            </div>

            {/* ... all other form fields remain unchanged ... */}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-royal-green hover:bg-green-700 disabled:bg-gray-400 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? t('affiliates.form.submitting') : t('affiliates.form.submit')}
              </button>
            </div>

            {submitMessage && (
              <div
                className={`text-center p-4 rounded-lg ${
                  submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AffiliatesPage;
