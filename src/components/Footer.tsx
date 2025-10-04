import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { FaTiktok, FaXTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa6'; // ✅ Added YouTube
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-burgundy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img 
              src="/favicon.png" 
              alt="Dunia Safari Tours" 
              className="h-16 w-auto mb-6"
            />
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>

            {/* WhatsApp Community Button */}
            <a
              href="https://www.whatsapp.com/channel/0029VbBVevv1SWsrGM6oC62B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-burgundy-900 hover:bg-gray-200 px-4 py-2 rounded-full font-semibold transition-colors duration-300 mb-6"
            >
              <FaWhatsapp className="w-5 h-5" />
              Join our WhatsApp Community
            </a>

            <div className="flex space-x-4">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/travelduniasafari?igsh=bGVnZ3R3Y2o5emF1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>

              {/* X (Twitter) */}
              <a 
                href="https://x.com/duniasafarigh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>

              {/* Facebook */}
              <a 
                href="https://web.facebook.com/travelduniasafari/?_rdc=1&_rdr#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@travelduniasafari?_t=ZM-8zyr8tWB4B9&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
              >
                <FaTiktok className="w-6 h-6" />
              </a>

              {/* ✅ YouTube (placeholder link) */}
              <a 
                href="https://www.youtube.com/@DuniaSafariTravel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => scrollToSection('#home')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('header.home')}
                </button>
              </li>
              <li>
                <Link 
                  to="/packages"
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('header.packages')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#about')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('header.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#faq')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('header.faq')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('header.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/packages"
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('footer.afconPackages')}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="text-left text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('footer.moroccoTravel')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#group-perks')}
                  className="text-left text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('footer.groupTours')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#faq')}
                  className="text-left text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('footer.visaSupport')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-left text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {t('footer.customPackages')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contactInfo')}</h3>
            <div className="space-y-1">
              <p className="text-gray-300">
                {t('footer.phone')}: +233 53 808 7709
              </p>
              <p className="text-gray-300">
                {t('footer.phone')}: +225 05 75 42 97 72
              </p>
              <p className="text-gray-300">
                {t('footer.email')}: travelduniasafari@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                {t('footer.copyright')}
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
  href="https://drive.google.com/file/d/1MBkPTJAYVONrGEmDGBcsqOZZe8SjFq5g/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
>
  {t('footer.privacyPolicy')}
</a>
              <a 
                href="https://drive.google.com/file/d/1MBkPTJAYVONrGEmDGBcsqOZZe8SjFq5g/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
              >
                {t('footer.termsOfService')}
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
