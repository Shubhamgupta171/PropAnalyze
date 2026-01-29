import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle Rate Limiting
      if (error.response.status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
        // You could also emit an event or show a toast notification here
        alert('You are making too many requests. Please slow down.');
      }
      
      // Handle Unauthorized
      if (error.response.status === 401) {
        console.warn('Unauthorized access. Redirecting to login...');
        // Optional: localStorage.removeItem('token'); window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
