import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Code, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const Education = () => {
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

  const subjectCategories = {
    core: {
      title: "Core Computer Science",
      icon: Code,
      subjects: portfolioData.education.subjects.slice(0, 4)
    },
    advanced: {
      title: "Advanced Specializations", 
      icon: BookOpen,
      subjects: portfolioData.education.subjects.slice(4)
    }
  };

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 mb-4">Academic Foundation</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Education & Learning
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A strong academic foundation in computer science combined with practical industry exposure 
              has shaped my technical expertise and problem-solving approach.
            </p>
          </motion.div>

          {/* Main Education Card */}
          <motion.div variants={itemVariants} className="mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{portfolioData.education.degree}</h3>
                      <p className="text-blue-100 text-lg">{portfolioData.education.university}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-blue-100">
                          <Calendar className="w-4 h-4 mr-2" />
                          {portfolioData.education.year}
                        </div>
                        <Badge className="bg-yellow-500 text-yellow-900 border-none">
                          <Award className="w-3 h-3 mr-1" />
                          {portfolioData.education.grade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                  <div className="space-y-2">
                    {portfolioData.education.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <p className="text-gray-700">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Subjects */}
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(subjectCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <div key={key}>
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">{category.title}</h4>
                        </div>
                        <div className="space-y-2">
                          {category.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary" className="mr-2 mb-2">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Learning & Development */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Continuous Learning Philosophy
                  </h3>
                  <p className="text-gray-700 max-w-3xl mx-auto">
                    My educational journey didn't end with graduation. I believe in continuous learning 
                    and staying updated with emerging technologies, industry best practices, and leadership 
                    methodologies through certifications, workshops, and hands-on project experience.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Academic Excellence</h4>
                    <p className="text-gray-600 text-sm">
                      First class with distinction, demonstrating strong analytical and problem-solving skills
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Industry Collaboration</h4>
                    <p className="text-gray-600 text-sm">
                      Worked with BMC Software during university, gaining real-world exposure early
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Foundation</h4>
                    <p className="text-gray-600 text-sm">
                      Strong foundation in algorithms, AI, and software architecture principles
                    </p>
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

export default Education;