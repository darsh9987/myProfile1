import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Code, Briefcase, GraduationCap, Award, ChevronDown, Users, Zap, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { portfolioData } from '../data/mock';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Achievements from './Achievements';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);

    // Handle scroll-based section detection
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'skills', 'achievements', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-lg font-medium">Crafting Your Digital Experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;