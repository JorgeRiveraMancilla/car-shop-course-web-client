import { useQuery } from '@tanstack/react-query';
import { searchClient } from '@/clients/SearchClient';
import { QueryKeys } from '@/libs/query-keys';
import { handleApiError } from '@/libs/error-handler';
import { SearchQueryParams } from '@/models/requests/search';
import { PaginationResponse } from '@/models/generics/pagination';
import { Auction } from '@/models/schemas/auction';

/**
 * Hook para búsqueda de auctions con React Query
 * Maneja automáticamente loading, error, caching y refetch
 */
export const useAuctionSearch = (params: SearchQueryParams) => {
  return useQuery<PaginationResponse<Auction>, Error>({
    // Key única para esta búsqueda específica
    queryKey: QueryKeys.auctions.search(params),

    // Función que hace la llamada a la API
    queryFn: async () => {
      try {
        return await searchClient.searchItems(params);
      } catch (error) {
        // El error se maneja centralizadamente y se re-lanza para React Query
        throw handleApiError(error);
      }
    },

    // Configuración específica para búsquedas
    staleTime: 1000 * 60 * 2, // 2 minutos - búsquedas se consideran frescas por menos tiempo
    gcTime: 1000 * 60 * 5, // 5 minutos en caché

    // Habilitar la query automáticamente
    enabled: true,

    // Opciones de refetch
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,

    // Retry solo en errores de red
    retry: (failureCount, error) => {
      // No reintentar en errores 4xx (cliente)
      if (error instanceof Error && error.message.includes('4')) {
        return false;
      }
      // Reintentar hasta 2 veces en otros errores
      return failureCount < 2;
    },

    // Configuración de retry delay
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook simplificado que devuelve solo los datos principales
 * Útil cuando no necesitas control granular del estado
 */
export const useAuctionSearchData = (params: SearchQueryParams) => {
  const { data, isLoading, error } = useAuctionSearch(params);

  return {
    auctions: data?.results || [],
    totalCount: data?.totalCount || 0,
    pageCount: data?.pageCount || 0,
    isLoading,
    error,
    hasResults: (data?.results?.length || 0) > 0,
  };
};
