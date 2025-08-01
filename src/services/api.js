import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

export const stockAIApi = {
  // Health check
  getHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Database status
  getDatabaseStatus: async () => {
    const response = await api.get('/database/status');
    return response.data;
  },

  // Process natural language query
  processQuery: async (question, limit = 100) => {
    const response = await api.post('/query', {
      question,
      limit,
    });
    return response.data;
  },

  // Get question suggestions
  getSuggestions: async () => {
    const response = await api.get('/suggestions');
    return response.data;
  },

  // Get example questions
  getExamples: async () => {
    const response = await api.get('/examples');
    return response.data;
  },
};

export default api; 