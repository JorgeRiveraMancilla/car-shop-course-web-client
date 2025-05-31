import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos - tiempo que los datos se consideran "frescos"
      gcTime: 1000 * 60 * 10, // 10 minutos - tiempo en caché después de no usarse
      retry: 3, // reintentos en caso de error
      refetchOnWindowFocus: false, // no refetch al enfocar ventana
      refetchOnReconnect: true, // refetch al reconectar internet
    },
    mutations: {
      retry: 1, // solo 1 reintento para mutaciones
    },
  },
});

if (process.env.NODE_ENV === 'development') {
  queryClient.setDefaultOptions({
    queries: {
      ...queryClient.getDefaultOptions().queries,
      staleTime: 1000 * 30, // 30 segundos en desarrollo para ver cambios más rápido
    },
  });
}
