import { envKeys, envLoader } from '@/utils/env';
import axios, { AxiosInstance } from 'axios';

const createApiClient = (auth: boolean = true) => {

  const apiClient = axios.create({
    baseURL: envLoader(envKeys.apiHost, 'http://rca-ukuru:8080'),
    timeout: Number(envLoader(envKeys.defaultTimeout, '5000')),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (auth) {
    addAuthInterceptor(apiClient);
  }

  return apiClient;

}

const addAuthInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
      if (!config.headers)
        config.headers = config.headers

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}

export default createApiClient;
