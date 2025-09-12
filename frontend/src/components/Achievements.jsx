import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal, Users, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const Achievements = () => {
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'recognition': return Award;
      case 'personal': return Medal;
      case 'academic': return Star;
      case 'technical': return Code;
      case 'sports': return Trophy;
      default: return Award;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'recognition': return 'text-yellow-600 bg-yellow-100';
      case 'personal': return 'text-green-600 bg-green-100';
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'technical': return 'text-purple-600 bg-purple-100';
      case 'sports': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 mb-4">Recognition</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Achievements & Awards
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Recognition for excellence in technical innovation, leadership, and personal growth 
              throughout my professional and academic journey.
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {portfolioData.achievements.map((achievement, index) => {
              const Icon = getCategoryIcon(achievement.category);
              const colorClass = getCategoryColor(achievement.category);

              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {achievement.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {achievement.description}
                      </CardDescription>
                      <div className="mt-4">
                        <Badge className={`${colorClass} text-xs`}>
                          {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-none">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Achievement Highlights
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">10+</div>
                    <p className="text-gray-600 text-sm">Awards & Recognition</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">First Class</div>
                    <p className="text-gray-600 text-sm">Academic Excellence</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Medal className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Multiple</div>
                    <p className="text-gray-600 text-sm">Sports Championships</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Finalist</div>
                    <p className="text-gray-600 text-sm">Coding Competitions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quote Section */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <blockquote className="text-xl italic text-gray-700 max-w-3xl mx-auto">
              "Excellence is not a destination; it's a continuous journey of learning, 
              growing, and making a meaningful impact in everything we do."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;