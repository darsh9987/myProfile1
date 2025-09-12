import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const portfolioApi = {
  // Get complete profile information
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch profile data');
    }
  },

  // Get all experience entries
  getExperience: async () => {
    try {
      const response = await api.get('/experience');
      return response.data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw new Error('Failed to fetch experience data');
    }
  },

  // Get skills and certifications
  getSkills: async () => {
    try {
      const response = await api.get('/skills');
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw new Error('Failed to fetch skills data');
    }
  },

  // Get achievements and awards
  getAchievements: async () => {
    try {
      const response = await api.get('/achievements');
      return response.data;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw new Error('Failed to fetch achievements data');
    }
  },

  // Get education information
  getEducation: async () => {
    try {
      const response = await api.get('/education');
      return response.data;
    } catch (error) {
      console.error('Error fetching education:', error);
      throw new Error('Failed to fetch education data');
    }
  },

  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }
  },

  // Get all contact submissions (admin endpoint)
  getContacts: async () => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw new Error('Failed to fetch contacts');
    }
  },

  // Health check endpoint
  healthCheck: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw new Error('API health check failed');
    }
  }
};

export default portfolioApi;