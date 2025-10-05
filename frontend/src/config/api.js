// API Configuration - Easy to change endpoints
export const API_CONFIG = {
  // Main chatbot API
  CHATBOT_URL: "http://98.66.232.134:5000" || 'http://localhost:5000',

  // Audio transcription API
  TRANSCRIPTION_URL: process.env.REACT_APP_TRANSCRIPTION_URL || 'http://0.0.0.0:8001',
  
  // Deep search API (add your deep search endpoint here)
  DEEP_SEARCH_URL: process.env.REACT_APP_DEEP_SEARCH_URL || 'http://localhost:8000',
};

export const API_ENDPOINTS = {
  QUERY: '/query',
  TRANSCRIBE: '/transcribe',
  DEEP_SEARCH: '/search', // Updated to match typical endpoint
};
