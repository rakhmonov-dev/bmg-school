import axios from 'axios';
import { ADMIN_BASE } from '../config';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bmg_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith(ADMIN_BASE)) {
      localStorage.removeItem('bmg_admin_token');
      localStorage.removeItem('bmg_admin_info');
      const loginPath = `${ADMIN_BASE}/login`;
      if (window.location.pathname !== loginPath) {
        window.location.href = loginPath;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
