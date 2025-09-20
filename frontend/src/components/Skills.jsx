import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Database, Cog, Users, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { portfolioData } from '../data/mock';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(portfolioData.skills.technical)[0]);
  const [activeTab, setActiveTab] = useState("technical"); // Add state for active tab
  //const [activeTab, setActiveTab] = useState("leadership"); // Add state for active tab
  //const [activeTab, setActiveTab] = useState("certifications"); // Add state for active tab
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

  const skillCategories = [
    { key: 'CRM Platforms', icon: Cog, color: 'text-blue-600', bg: 'bg-blue-100' },
    { key: 'Enterprise Integration', icon: Cloud, color: 'text-green-600', bg: 'bg-green-100' },
    { key: 'Cloud Platforms', icon: Cloud, color: 'text-purple-600', bg: 'bg-purple-100' },
    { key: 'Programming', icon: Code, color: 'text-orange-600', bg: 'bg-orange-100' },
    { key: 'Frontend Technologies', icon: Code, color: 'text-pink-600', bg: 'bg-pink-100' },
    { key: 'Databases', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-100' }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">Technical Expertise</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience with enterprise-grade 
              technologies and modern development practices.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent key="technical" value="technical">
              {/*console.log("Rendering Technical Tab")*/}
              <div className="grid lg:grid-cols-3 gap-8">
                
                <div variants={itemVariants} className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Skill Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {skillCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <button
                              key={category.key}
                              onClick={() => setActiveCategory(category.key)}
                              className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors ${
                                activeCategory === category.key ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-lg ${category.bg} flex items-center justify-center`}>
                                  <Icon className={`w-4 h-4 ${category.color}`} />
                                </div>
                                <span className={`font-medium ${
                                  activeCategory === category.key ? 'text-blue-700' : 'text-gray-700'
                                }`}>
                                  {category.key}
                                </span>
                              </div>
                              <ChevronRight className={`w-4 h-4 ${
                                activeCategory === category.key ? 'text-blue-500' : 'text-gray-400'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                
                <div variants={itemVariants} className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {skillCategories.find(cat => cat.key === activeCategory) && (
                          <>
                            <div className={`w-8 h-8 rounded-lg ${skillCategories.find(cat => cat.key === activeCategory).bg} flex items-center justify-center`}>
                              {React.createElement(skillCategories.find(cat => cat.key === activeCategory).icon, {
                                className: `w-4 h-4 ${skillCategories.find(cat => cat.key === activeCategory).color}`
                              })}
                            </div>
                            <span>{activeCategory}</span>
                          </>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Technologies and tools I work with regularly
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {portfolioData.skills.technical[activeCategory]?.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="w-full justify-center py-2 px-3 hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent key="leadership" value="leadership">
              {/*console.log("Rendering Leadership Tab")*/}
              <div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
                {portfolioData.skills.leadership.map((skill, index) => (
                  <motion.div key={skill} variants={itemVariants}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{skill}</h3>
                            <p className="text-gray-600 text-sm">
                              Proven ability to {skill.toLowerCase()} across diverse teams and projects
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent key="certifications" value="certifications">
              {/*console.log("Rendering Certifications Tab")*/}
              <div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.skills.certifications.map((cert, index) => (
                  <motion.div key={cert} variants={itemVariants}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{cert}</h3>
                        <Badge className="bg-green-100 text-green-800">Certified</Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Skills;