import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { getSession, signOut } from 'next-auth/react';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

export default class AxiosClient {
  protected axios: AxiosInstance;
  protected baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      timeout: 30000, // 30 segundos
    });

    this.setupInterceptors();
  }

  /**
   * Configurar interceptores de request y response
   */
  private setupInterceptors(): void {
    // Request interceptor - agregar token de autenticación
    this.axios.interceptors.request.use(
      async config => {
        if (!config.headers) {
          throw new Error('Config headers not defined');
        }

        try {
          // Obtener la sesión actual usando tu configuración de NextAuth
          const session = await getSession();

          if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          }

          // Agregar timestamp para debugging
          config.headers['X-Request-Time'] = new Date().toISOString();
        } catch {}

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - manejar errores y renovación de tokens
    this.axios.interceptors.response.use(
      response => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Si es un error de red
        if (!error.response) {
          throw this.createApiError(
            'Error de conexión. Verifica tu conexión a internet.',
            0,
            'NETWORK_ERROR'
          );
        }

        const { status } = error.response;

        // Manejar errores 401 (No autorizado)
        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Intentar renovar la sesión
            const session = await getSession();

            if (session?.accessToken) {
              return this.axios(originalRequest);
            } else {
              await signOut({ redirect: true, callbackUrl: '/auth/sign-in' });
            }
          } catch (refreshError) {
            await signOut({ redirect: true, callbackUrl: '/auth/sign-in' });
            return Promise.reject(refreshError);
          } finally {
          }
        }

        // Manejar otros errores HTTP
        throw this.handleHttpError(error);
      }
    );
  }

  /**
   * Manejar errores HTTP específicos
   */
  private handleHttpError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const responseData = error.response?.data as
      | Record<string, unknown>
      | undefined;

    let message = 'Ha ocurrido un error inesperado';
    let code = 'UNKNOWN_ERROR';

    switch (status) {
      case 400:
        message =
          (responseData?.message as string) ||
          (responseData?.title as string) ||
          'Datos inválidos en la solicitud';
        code = 'BAD_REQUEST';
        break;
      case 401:
        message = 'No tienes autorización para realizar esta acción';
        code = 'UNAUTHORIZED';
        break;
      case 403:
        message = 'No tienes permisos para acceder a este recurso';
        code = 'FORBIDDEN';
        break;
      case 404:
        message = 'El recurso solicitado no fue encontrado';
        code = 'NOT_FOUND';
        break;
      case 409:
        message =
          (responseData?.message as string) ||
          (responseData?.title as string) ||
          'Conflicto con el estado actual del recurso';
        code = 'CONFLICT';
        break;
      case 422:
        message =
          (responseData?.message as string) ||
          (responseData?.title as string) ||
          'Los datos proporcionados no son válidos';
        code = 'VALIDATION_ERROR';
        break;
      case 429:
        message = 'Demasiadas solicitudes. Intenta nuevamente más tarde';
        code = 'RATE_LIMIT';
        break;
      case 500:
        message = 'Error interno del servidor. Intenta nuevamente más tarde';
        code = 'INTERNAL_SERVER_ERROR';
        break;
      case 502:
      case 503:
      case 504:
        message =
          'Servicio temporalmente no disponible. Intenta nuevamente más tarde';
        code = 'SERVICE_UNAVAILABLE';
        break;
      default:
        message =
          (responseData?.message as string) ||
          (responseData?.title as string) ||
          `Error ${status}: ${error.message}`;
    }

    return this.createApiError(message, status, code);
  }

  /**
   * Crear objeto de error API estandarizado
   */
  private createApiError(
    message: string,
    status?: number,
    code?: string
  ): ApiError {
    const error = new Error(message) as ApiError;
    error.status = status;
    error.code = code;
    return error;
  }
}
