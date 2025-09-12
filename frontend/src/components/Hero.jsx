import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, Code2, Zap, Target, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = [
    "Enterprise Solutions Architect",
    "CRM Specialist & Technical Leader", 
    "Salesforce Development Expert",
    "Full-Stack Innovation Engineer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Code2, label: "Years Experience", value: "15+" },
    { icon: Users, label: "Enterprise Clients", value: "50+" },
    { icon: Target, label: "Success Rate", value: "99%" },
    { icon: Zap, label: "Projects Delivered", value: "100+" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Hero image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <div className="relative h-full">
          <img
            src={portfolioData.personal.heroImage}
            alt="Professional Developer"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:w-2/3">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Available for New Opportunities
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Hello, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {portfolioData.personal.name}
            </span>
          </motion.h1>

          {/* Animated subtitle */}
          <div className="mb-6 h-16 lg:h-20">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-300"
              >
                {titles[currentTitleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl"
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              onClick={() => scrollToSection('experience')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group"
            >
              Explore My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <stat.icon className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-2xl lg:text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;