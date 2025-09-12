import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Code2, Users, Zap, Target, Award, Globe } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const values = [
    {
      icon: Code2,
      title: "Technical Excellence",
      description: "Crafting scalable, maintainable solutions with cutting-edge technologies"
    },
    {
      icon: Users,
      title: "Collaborative Leadership",
      description: "Empowering teams to deliver beyond expectations through mentorship"
    },
    {
      icon: Zap,
      title: "Innovation Focus",
      description: "Constantly exploring new approaches to solve complex business challenges"
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Delivering measurable business value through strategic technical decisions"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Image and stats */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              <img
                src={portfolioData.personal.profileImage}
                alt="Professional Profile"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              {/* Floating achievement cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Certified Expert</p>
                    <p className="text-sm text-gray-600">Salesforce & Azure</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Global Impact</p>
                    <p className="text-sm text-gray-600">5+ Countries</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <Badge className="bg-blue-100 text-blue-800 mb-4">About Me</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {portfolioData.about.headline}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {portfolioData.about.description}
              </p>
            </motion.div>

            {/* Key highlights */}
            <motion.div variants={itemVariants} className="space-y-4">
              {portfolioData.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{highlight}</p>
                </div>
              ))}
            </motion.div>

            {/* Philosophy */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">My Philosophy</h3>
                  <p className="text-gray-700 italic">
                    "{portfolioData.about.philosophy}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 mb-4">Core Values</Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              What Drives My Work
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;