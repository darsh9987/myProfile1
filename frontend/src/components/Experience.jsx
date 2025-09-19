import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Briefcase, Code, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const Experience = () => {
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'leadership': return Users;
      case 'technical': return Code;
      case 'consulting': return Lightbulb;
      case 'development': return Code;
      default: return Briefcase;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'leadership': return 'bg-purple-100 text-purple-800';
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'consulting': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-4">Professional Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experience & Impact
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A decade and a half of transforming businesses through innovative technology solutions 
              and strategic technical leadership across global markets.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-0.5" />

            {portfolioData.experience.map((exp, index) => {
              const Icon = getTypeIcon(exp.type);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex items-center mb-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 border-4 border-white rounded-full shadow-lg transform md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="ml-12 md:ml-0 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getTypeColor(exp.type)}>
                                <Icon className="w-3 h-3 mr-1" />
                                {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {exp.period}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl text-gray-900 mb-1">
                              {exp.role}
                            </CardTitle>
                            <CardDescription className="flex items-center text-base font-medium text-blue-600">
                              <Briefcase className="w-4 h-4 mr-2" />
                              {exp.company}
                            </CardDescription>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {exp.location}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        
                        {/* Key Achievements */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.slice(0, 3).map((achievement, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                            {exp.achievements.length > 3 && (
                              <li className="text-sm text-gray-500 italic">
                                +{exp.achievements.length - 3} more achievements
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>

          {/* Career Summary */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Career Highlights Summary
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">16+</div>
                    <p className="text-gray-700">Years of Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">10</div>
                    <p className="text-gray-700">Global Companies</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                    <p className="text-gray-700">Enterprise Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;