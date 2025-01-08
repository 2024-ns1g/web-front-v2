import { envKeys, envLoader } from '@/utils/env';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: envLoader(envKeys.apiHost, 'http://localhost:8080'),
  timeout: Number(envLoader(envKeys.defaultTimeout, '5000')),
});
