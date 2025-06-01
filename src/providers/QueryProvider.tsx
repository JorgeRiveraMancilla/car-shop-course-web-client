'use client';

import {
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import { toast } from 'sonner';

interface QueryProviderProps {
  children: ReactNode;
}

interface ApiError extends Error {
  status?: number;
  handled?: boolean;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 10,
          retry: 3,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
        },
        mutations: {
          retry: 1,
        },
      },

      queryCache: new QueryCache({
        onError: (error: unknown) => {
          const apiError = error as ApiError;

          if (
            apiError?.status &&
            apiError.status >= 500 &&
            !apiError?.handled
          ) {
            toast.error('Error del servidor', {
              description: 'Problema de conectividad. Intenta nuevamente.',
              duration: 5000,
            });
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: (error: unknown) => {
          const apiError = error as ApiError;

          if (!apiError?.handled) {
            toast.error('Error en la operación', {
              description:
                apiError?.message || 'Ha ocurrido un error inesperado',
              duration: 5000,
            });
          }
        },
      }),
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}
