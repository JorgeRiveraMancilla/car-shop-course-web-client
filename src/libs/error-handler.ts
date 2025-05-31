import { AxiosError } from 'axios';

/**
 * Estructura estándar para errores de API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Tipos de errores para categorización
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Interfaz para manejar notificaciones de error
 */
export interface ErrorNotifier {
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}

// Notificador por defecto (console.error) - será reemplazado por Sonner
const defaultNotifier: ErrorNotifier = {
  showError: (message: string, title?: string) => {
    console.error(title ? `${title}: ${message}` : message);
  },
  showWarning: (message: string, title?: string) => {
    console.warn(title ? `${title}: ${message}` : message);
  },
};

// Variable global para el notificador
let errorNotifier: ErrorNotifier = defaultNotifier;

/**
 * Configura el notificador de errores (será llamado desde QueryProvider)
 */
export const setErrorNotifier = (notifier: ErrorNotifier) => {
  errorNotifier = notifier;
};

/**
 * Categoriza un error según su tipo
 */
const categorizeError = (error: AxiosError): ErrorType => {
  if (!error.response) return ErrorType.NETWORK;

  const status = error.response.status;

  if (status === 401) return ErrorType.AUTHENTICATION;
  if (status === 403) return ErrorType.AUTHORIZATION;
  if (status >= 400 && status < 500) return ErrorType.VALIDATION;
  if (status >= 500) return ErrorType.SERVER;

  return ErrorType.UNKNOWN;
};

/**
 * Obtiene un mensaje de error amigable según el tipo
 */
const getFriendlyMessage = (
  type: ErrorType,
  originalMessage: string
): string => {
  switch (type) {
    case ErrorType.NETWORK:
      return 'Error de conexión. Verifica tu internet e intenta nuevamente.';
    case ErrorType.AUTHENTICATION:
      return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
    case ErrorType.AUTHORIZATION:
      return 'No tienes permisos para realizar esta acción.';
    case ErrorType.VALIDATION:
      return originalMessage || 'Los datos enviados no son válidos.';
    case ErrorType.SERVER:
      return 'Error en el servidor. Intenta nuevamente en unos momentos.';
    default:
      return originalMessage || 'Ha ocurrido un error inesperado.';
  }
};

/**
 * Maneja errores de API de forma centralizada
 */
export const handleApiError = (
  error: unknown,
  showNotification = true
): ApiError => {
  // Si ya es una instancia de ApiError, la retornamos
  if (error instanceof ApiError) {
    if (showNotification) {
      errorNotifier.showError(error.message, 'Error');
    }
    return error;
  }

  // Manejo de errores de Axios
  if (error instanceof AxiosError) {
    const errorType = categorizeError(error);
    const originalMessage = error.response?.data?.message || error.message;
    const friendlyMessage = getFriendlyMessage(errorType, originalMessage);

    const apiError = new ApiError(
      friendlyMessage,
      error.response?.status,
      error.response?.data?.code,
      error.response?.data
    );

    // Log detallado para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error Details:', {
        type: errorType,
        status: error.response?.status,
        originalMessage,
        friendlyMessage,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response?.data,
      });
    }

    // Mostrar notificación al usuario (excepto para 401 que redirige automáticamente)
    if (showNotification && errorType !== ErrorType.AUTHENTICATION) {
      const title =
        errorType === ErrorType.NETWORK
          ? 'Error de Conexión'
          : errorType === ErrorType.SERVER
            ? 'Error del Servidor'
            : 'Error';

      errorNotifier.showError(friendlyMessage, title);
    }

    return apiError;
  }

  // Manejo de errores genéricos
  if (error instanceof Error) {
    const message = error.message || 'Ha ocurrido un error inesperado';
    if (showNotification) {
      errorNotifier.showError(message, 'Error');
    }
    return new ApiError(message);
  }

  // Error desconocido
  const message = 'Error desconocido';
  if (showNotification) {
    errorNotifier.showError(message, 'Error');
  }
  return new ApiError(message);
};

/**
 * Hook para manejo de errores en React Query
 */
export const useErrorHandler = () => {
  return {
    handleError: (error: unknown, showNotification = true) =>
      handleApiError(error, showNotification),

    // Funciones para mostrar notificaciones manuales
    showError: (message: string, title?: string) =>
      errorNotifier.showError(message, title),

    showWarning: (message: string, title?: string) =>
      errorNotifier.showWarning(message, title),
  };
};
