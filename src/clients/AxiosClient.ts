import axios, { AxiosInstance } from 'axios';

export default class AxiosClient {
  protected axios: AxiosInstance;
  protected baseUrl: string;

  constructor() {
    this.baseUrl = '/api';

    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.axios.interceptors.request.use(
      async config => {
        if (!config.headers) throw new Error('Config is not defined');
        return config;
      },
      error => {
        throw error;
      }
    );

    this.axios.interceptors.response.use(
      response => response,
      error => {
        if (!error.response) {
          console.error('Network Error Details:', error);
          throw new Error('Network Error - Please check your connection');
        }

        if (error.response.status === 401) {
          window.location.replace('/');
        }

        throw error;
      }
    );
  }
}
