import axios from 'axios';
import localAPI from './localAPI';

const API_URL = import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const configModified = config;

  if (token) {
    configModified.headers.Authorization = `Bearer ${token}`;
  }

  return configModified;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localAPI.deleteToken();
    }
    return Promise.reject(error);
  },
);

export default api;
