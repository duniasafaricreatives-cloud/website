import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Users, DollarSign } from 'lucide-react';

const AffiliatesPage = () => {
  const { t } = useTranslation();
  
  // Form state
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
    payoutMethod: '',
    payoutMethodOther: '',
    additionalInfo: '',
    // ✅ New fields
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

    try {
      const response = await fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage(t('affiliates.form.successMessage'));
        // Reset form (includes new fields)
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
          payoutMethod: '',
          payoutMethodOther: '',
          additionalInfo: '',
          supportNeeded: [],
          supportNeededOther: '',
          commissionAcknowledgement: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage(t('affiliates.form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      icon: Users,
      title: t('affiliates.steps.step1.title'),
      description: t('affiliates.steps.step1.description')
    },
    {
      icon: CheckCircle,
      title: t('affiliates.steps.step2.title'),
      description: t('affiliates.steps.step2.description')
    },
    {
      icon: DollarSign,
      title: t('affiliates.steps.step3.title'),
      description: t('affiliates.steps.step3.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="relative mt-16">
  {/* Background image block with responsive banner heights */}
  <div
    className="
      w-full
      h-[40vh]        /* mobile banner height */
      sm:h-[52vh]     /* tablets */
      md:h-[65vh]     /* desktops */
      bg-no-repeat bg-cover bg-center
      [background-position:50%_35%]   /* nudge focal point slightly up */
    "
    style={{ backgroundImage: "url('/my-affiliate-hero.jpg')" }}
  />
  {/* Centered text overlay (no dark overlay) */}
  <div className="absolute inset-0 flex items-center justify-center px-4">
    <div className="max-w-4xl text-center">
      <h1
        className="
          text-white font-bold leading-tight
          text-3xl sm:text-4xl md:text-6xl
          mb-4 md:mb-6
          [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]
        "
      >
        {t('affiliates.hero.title')}
      </h1>
      <p
        className="
          text-white/95
          text-lg sm:text-xl md:text-2xl
          [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]
        "
      >
        {t('affiliates.hero.subtitle')}
      </p>
    </div>
        </div>
      </section>

      {/* Three-Step Process */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              {t('affiliates.process.title')}
            </h2>
            <div className="w-24 h-1 bg-warm-yellow mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-green rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
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
            <p className="text-xl text-gray-700">
              {t('affiliates.form.subtitle')}
            </p>
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.email')}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.phoneNumber')} *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.phoneNumber')}
              />
            </div>

            {/* Social Media Handles */}
            <div>
              <label htmlFor="socialMediaHandles" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.socialMediaHandles')} *
              </label>
              <textarea
                id="socialMediaHandles"
                name="socialMediaHandles"
                value={formData.socialMediaHandles}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.socialMediaHandles')}
              />
            </div>

            {/* Follower Count */}
            <div>
              <label htmlFor="followerCount" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.followerCount')} *
              </label>
              <select
                id="followerCount"
                name="followerCount"
                value={formData.followerCount}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
              >
                <option value="">{t('affiliates.form.placeholders.followerCount')}</option>
                <option value="under-1k">{t('affiliates.form.options.followerCount.under1k')}</option>
                <option value="1k-5k">{t('affiliates.form.options.followerCount.1k5k')}</option>
                <option value="5k-10k">{t('affiliates.form.options.followerCount.5k10k')}</option>
                <option value="10k-50k">{t('affiliates.form.options.followerCount.10k50k')}</option>
                <option value="50k-100k">{t('affiliates.form.options.followerCount.50k100k')}</option>
                <option value="100k-500k">{t('affiliates.form.options.followerCount.100k500k')}</option>
                <option value="500k-1m">{t('affiliates.form.options.followerCount.500k1m')}</option>
                <option value="over-1m">{t('affiliates.form.options.followerCount.over1m')}</option>
              </select>
            </div>

            {/* Content Types */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                {t('affiliates.form.fields.contentTypes')} *
              </label>
              <div className="space-y-3">
                {[
                  'travel-vlogs',
                  'instagram-posts',
                  'tiktok-videos',
                  'youtube-content',
                  'blog-articles',
                  'podcast-episodes',
                  'live-streaming',
                  'other'
                ].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      value={type}
                      checked={formData.contentTypes.includes(type)}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-royal-green border-gray-300 rounded focus:ring-royal-green"
                    />
                    <span className="ml-3 text-gray-700">
                      {t(`affiliates.form.options.contentTypes.${type}`)}
                    </span>
                  </label>
                ))}
              </div>
              {formData.contentTypes.includes('other') && (
                <div className="mt-4">
                  <input
                    type="text"
                    name="contentTypesOther"
                    value={formData.contentTypesOther}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                    placeholder={t('affiliates.form.placeholders.contentTypesOther')}
                  />
                </div>
              )}
            </div>

            {/* Audience Description */}
            <div>
              <label htmlFor="audienceDescription" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.audienceDescription')} *
              </label>
              <textarea
                id="audienceDescription"
                name="audienceDescription"
                value={formData.audienceDescription}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.audienceDescription')}
              />
            </div>

            {/* Previous Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                {t('affiliates.form.fields.previousExperience')} *
              </label>
              <div className="space-y-3">
                {['yes-travel','yes-other','no','other'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="previousExperience"
                      value={option}
                      checked={formData.previousExperience === option}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-royal-green border-gray-300 focus:ring-royal-green"
                    />
                    <span className="ml-3 text-gray-700">
                      {t(`affiliates.form.options.previousExperience.${option}`)}
                    </span>
                  </label>
                ))}
              </div>
              {formData.previousExperience === 'other' && (
                <div className="mt-4">
                  <input
                    type="text"
                    name="previousExperienceOther"
                    value={formData.previousExperienceOther}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                    placeholder={t('affiliates.form.placeholders.previousExperienceOther')}
                  />
                </div>
              )}
            </div>

            {/* Why Join */}
            <div>
              <label htmlFor="whyJoin" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.whyJoin')} *
              </label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.whyJoin')}
              />
            </div>

            {/* ✅ Support Needed (new) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                What type of support do you need from Dunia Safari to promote effectively? *
              </label>
              <div className="space-y-3">
                {[
                  'Marketing materials (flyers, posters, graphics)',
                  'Affiliate code / unique tracking link',
                  'Training / Orientation session',
                  'Others'
                ].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.supportNeeded.includes(option)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setFormData(prev => ({
                          ...prev,
                          supportNeeded: checked
                            ? [...prev.supportNeeded, value]
                            : prev.supportNeeded.filter(item => item !== value)
                        }));
                      }}
                      className="w-4 h-4 text-royal-green border-gray-300 rounded focus:ring-royal-green"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {/* ✅ Support Needed → Others text field */}
              {formData.supportNeeded.includes('Others') && (
                <div className="mt-4">
                  <input
                    type="text"
                    name="supportNeededOther"
                    value={formData.supportNeededOther}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                    placeholder="Please specify other support you need"
                  />
                </div>
              )}
            </div>

            {/* ✅ Commission Acknowledgement (new) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Do you acknowledge that only fully paid packages count towards commissions and rewards? *
              </label>
              <div className="space-y-3">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="commissionAcknowledgement"
                      value={option}
                      checked={formData.commissionAcknowledgement === option}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-royal-green border-gray-300 focus:ring-royal-green"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('affiliates.form.fields.additionalInfo')}
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-green focus:border-transparent"
                placeholder={t('affiliates.form.placeholders.additionalInfo')}
              />
            </div>

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

            {/* Submit Message */}
            {submitMessage && (
              <div className={`text-center p-4 rounded-lg ${
                submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
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
