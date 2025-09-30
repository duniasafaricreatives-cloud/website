import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Footer() {
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
              Authentic travels, for less. Creating unforgettable AFCON 2025 experiences in Morocco
            </p>
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('#home')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <Link 
                  to="/packages"
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  Packages
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#about')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#faq')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  AFCON 2025 Packages
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  Morocco Travel
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  Group Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  Visa Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  Custom Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                Phone: +233 53 808 7709
              </p>
              <p className="text-gray-300">
                Email: travelduniasafari@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                © 2025 Dunia Safari Tours. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

}