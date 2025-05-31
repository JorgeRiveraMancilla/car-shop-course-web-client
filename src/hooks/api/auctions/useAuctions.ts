import { useQuery } from '@tanstack/react-query';
import { auctionClient } from '@/clients/AuctionClient';
import { QueryKeys } from '@/libs/query-keys';
import { handleApiError } from '@/libs/error-handler';
import { TAuction } from '@/models/schemas/auction';

/**
 * Hook para obtener todas las auctions
 */
export const useAuctions = (date?: string) => {
  return useQuery<TAuction[], Error>({
    queryKey: QueryKeys.auctions.list(date),
    queryFn: async () => {
      try {
        return await auctionClient.getAllAuctions(date);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });
};

/**
 * Hook para obtener una auction específica por ID
 */
export const useAuction = (id: string) => {
  return useQuery<TAuction, Error>({
    queryKey: QueryKeys.auctions.byId(id),
    queryFn: async () => {
      try {
        return await auctionClient.getAuctionById(id);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!id, // Solo ejecutar si hay ID
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
