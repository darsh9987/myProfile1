import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { portfolioApi } from '../services/api';
import { portfolioData } from '../data/mock';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //const response = await portfolioApi.submitContact(formData);
      const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      subject: formData.subject,
      message: formData.message,
    };
      const response = await emailjs.send(
        'service_s6kho7e', // Replace with your EmailJS service ID
        'template_d2u7n4s', // Replace with your EmailJS template ID
        templateParams,
        'xFncG3x_rdulh0WzF' // Replace with your EmailJS public key
      );
      console.log('EmailJS response:', response);
      
      toast({
        title: "Message Sent Successfully!",
        description: response.message || "Thank you for reaching out. I'll get back to you earliest possible.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: portfolioData.personal.email,
      description: "Drop me a line anytime",
      //action: `mailto:${portfolioData.personal.email}`
      action: `mailto:DFulfagar@gmail.com`  // Updated to avoid spam bots
    },
    {
      icon: Phone,
      title: "Phone",
      value: portfolioData.personal.phone,
      description: "Let's have a conversation",
      action: `tel:${portfolioData.personal.phone}`
    },
    {
      icon: MapPin,
      title: "Location",
      value: portfolioData.personal.location,
      description: "Available globally",
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-4">Get In Touch</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {portfolioData.contact.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
              {portfolioData.contact.description}
            </p>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              {portfolioData.contact.availability}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div key={index}>
                        {method.action ? (
                          <a
                            href={method.action}
                            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <Icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{method.title}</h4>
                              <p className="text-blue-600 font-medium">{method.value}</p>
                              <p className="text-gray-500 text-sm">{method.description}</p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start space-x-4 p-4 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{method.title}</h4>
                              <p className="text-gray-700 font-medium">{method.value}</p>
                              <p className="text-gray-500 text-sm">{method.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => window.open('https://www.linkedin.com/in/dfulfagar', '_blank')}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => window.open('https://github.com/darsh9987', '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </Button>
                </div>
              </div>

              {/* Response Time */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Quick Response</h4>
                      <p className="text-green-700 text-sm">Usually responds within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me more about your project or how I can help you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>{portfolioData.contact.cta}</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;