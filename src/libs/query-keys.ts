import { TSearchQueryParams } from '@/models/requests/search';

/**
 * Query keys centralizadas para React Query
 * Estructura jerárquica que permite invalidación granular
 */
export const QueryKeys = {
  // Keys para auctions
  auctions: {
    // Key base para todas las queries de auctions
    all: ['auctions'] as const,

    // Búsquedas con parámetros
    search: (params: TSearchQueryParams) =>
      [...QueryKeys.auctions.all, 'search', params] as const,

    // Auction individual por ID
    byId: (id: string) => [...QueryKeys.auctions.all, 'detail', id] as const,

    // Lista general de auctions (getAllAuctions)
    list: (date?: string) =>
      [...QueryKeys.auctions.all, 'list', { date }] as const,
  },
} as const;

/**
 * Utilidades para invalidación de cache
 */
export const QueryInvalidation = {
  // Invalida todas las queries de auctions
  allAuctions: () => QueryKeys.auctions.all,

  // Invalida solo las búsquedas
  auctionSearches: () => [...QueryKeys.auctions.all, 'search'],

  // Invalida un auction específico
  auctionById: (id: string) => QueryKeys.auctions.byId(id),
};
