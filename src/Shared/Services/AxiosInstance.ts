import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Configuration for the Axios instance
 */
const axiosConfig = {
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Creates and configures an Axios instance with interceptors for authentication
 * and error handling.
 */
const axiosInstance = axios.create(axiosConfig);

/**
 * Request interceptor that adds the authentication token to requests
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor that handles authentication errors
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 