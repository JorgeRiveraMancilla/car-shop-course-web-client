import { useMemo } from 'react';
import { SearchParams, StoreParams } from '@/schemas';

/**
 * Hook para transformar parámetros del store a SearchParams válidos para API
 */
export const useSearchParams = (storeParams: StoreParams): SearchParams => {
  return useMemo(() => {
    return {
      searchTerm: storeParams.searchTerm,
      pageSize: storeParams.pageSize,
      pageNumber: storeParams.pageNumber,
      seller: storeParams.seller,
      winner: storeParams.winner,
      orderBy: storeParams.orderBy,
      filterBy: storeParams.filterBy,
    };
  }, [storeParams]);
};
