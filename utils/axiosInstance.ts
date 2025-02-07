// utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your base URL here
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config before request is sent (e.g., add authorization header)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login page)
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
