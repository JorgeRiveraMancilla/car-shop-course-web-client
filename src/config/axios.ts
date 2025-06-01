import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 30000,
  });

  instance.interceptors.request.use(
    async config => {
      if (!config.headers) {
        throw new Error('Config headers not defined');
      }

      try {
        const session = await getSession();
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        config.headers['X-Request-Time'] = new Date().toISOString();
      } catch {}

      return config;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!error.response) {
        const networkError = new Error(
          'Error de conexión. Verifica tu conexión a internet.'
        ) as ApiError;
        networkError.code = 'NETWORK_ERROR';
        networkError.status = 0;
        throw networkError;
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
      }

      throw error;
    }
  );

  return instance;
};
