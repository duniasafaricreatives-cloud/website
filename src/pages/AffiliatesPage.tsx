import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Users, Award, DollarSign } from 'lucide-react';

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
    additionalInfo: ''
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
        // Reset form
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
          additionalInfo: ''
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
      <section 
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat mt-16"
        style={{
          backgroundImage: "url('/my-affiliate-hero.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
             
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
             
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

          {/* form unchanged */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ... your form fields remain here, unchanged ... */}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AffiliatesPage;
