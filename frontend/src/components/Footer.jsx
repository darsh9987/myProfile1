import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' }
  ];

  const services = [
    'Enterprise Architecture',
    'Salesforce Development',
    'CRM Integration',
    'Technical Leadership',
    'System Design',
    'Cloud Solutions'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">{portfolioData.personal.name}</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Transforming complex business challenges into elegant technical solutions 
              with 15+ years of enterprise development expertise.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={`mailto:${portfolioData.personal.email}`}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {portfolioData.personal.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {portfolioData.personal.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-300">
                  {portfolioData.personal.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
              <span>© {currentYear} {portfolioData.personal.name}. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and lots of</span>
              <Code2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-white transition-colors"
              >
                Back to Top
              </button>
              <span>•</span>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-white transition-colors"
              >
                Let's Work Together
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;