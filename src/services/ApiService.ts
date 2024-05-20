import axios from 'axios';
import { API_KEY, BASE_URL } from '../utilities/constants';

class ApiService {
  static defaultHeaders = () => {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };

    return headers;
  };

  // initialize
  static init = () => {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: ApiService.defaultHeaders(),
    });
    return instance;
  };
}

export default ApiService;
