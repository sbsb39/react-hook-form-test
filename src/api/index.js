import axios from 'axios';
import { isDevServer } from '@/utils/CommonUtils';

export const defaultApiUrl = isDevServer() ? '/api' : process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: defaultApiUrl,
  timeout: 1000,
  headers: {
    'x-api-key': 'F4XPW8rU1NgjXB10yq457ipW7R9KDNi9PLCAE7T9',
    'x-api-key-mame': 'intaxi'
  }
});

export { API };
