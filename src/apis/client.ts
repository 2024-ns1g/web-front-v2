import { envKeys, envLoader } from '@/utils/env';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: envLoader(envKeys.apiHost, 'http://localhost:8080'),
  timeout: Number(envLoader(envKeys.defaultTimeout, '5000')),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    if (!config.headers)
      config.headers = {};

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
