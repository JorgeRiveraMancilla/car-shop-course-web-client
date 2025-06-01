import { SearchQueryParams } from '@/models/requests/search';

/**
 * Query keys centralizadas para React Query
 * Estructura jerárquica que permite invalidación granular
 */
export const QueryKeys = {
  auctions: {
    all: ['auctions'] as const,

    search: (params: SearchQueryParams) =>
      [...QueryKeys.auctions.all, 'search', params] as const,

    byId: (id: string) => [...QueryKeys.auctions.all, 'detail', id] as const,

    list: (date?: string) =>
      [...QueryKeys.auctions.all, 'list', { date }] as const,
  },
} as const;

/**
 * Utilidades para invalidación de cache
 */
export const QueryInvalidation = {
  allAuctions: () => QueryKeys.auctions.all,

  auctionSearches: () => [...QueryKeys.auctions.all, 'search'],

  auctionById: (id: string) => QueryKeys.auctions.byId(id),
};
