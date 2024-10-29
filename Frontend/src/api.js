import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-by-deepak-8.onrender.com/api', // Adjust to your backend URL
});

// Add request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      config.headers['Authorization'] = `Bearer ${userInfo.token}`; // Include the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userInfo'); // Clear user data on unauthorized access
      window.location.href = '/'; // Redirect to home page
    }
    return Promise.reject(error);
  }
);

export default api;


