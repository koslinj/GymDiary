// axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from './FirebaseConfig';

// Setup default baseURL
axios.defaults.baseURL = 'https://backend-diary-jqjw.onrender.com';

// Setup Axios interceptor for requests
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Setup Axios interceptor for responses to handle token expiry
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const newToken = await user.getIdToken(true);
          await AsyncStorage.setItem('accessToken', newToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (tokenError) {
        return Promise.reject(tokenError);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
