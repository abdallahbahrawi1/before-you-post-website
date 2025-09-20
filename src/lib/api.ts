import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Critical for sending cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      console.log('Authentication error - redirecting to login');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;