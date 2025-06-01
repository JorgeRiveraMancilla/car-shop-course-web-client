import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auctionClient } from '@/clients/AuctionClient';
import { searchClient } from '@/clients/SearchClient';
import { AuctionService } from '@/services';
import {
  UpdateAuctionInput,
  SearchParams,
  Auction,
  AuctionFormInput,
} from '@/schemas';
import { toast } from 'sonner';

export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (filters: string) => [...auctionKeys.lists(), { filters }] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: string) => [...auctionKeys.details(), id] as const,
  search: (params: SearchParams) =>
    [...auctionKeys.all, 'search', params] as const,
};

/**
 * Hook para obtener todas las subastas
 */
export const useAuctions = (date?: string) => {
  return useQuery({
    queryKey: auctionKeys.list(date || 'all'),
    queryFn: () => auctionClient.getAllAuctions(date),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

/**
 * Hook para obtener una subasta específica
 */
export const useAuction = (id: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => auctionClient.getAuctionById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

/**
 * Hook para búsqueda de subastas
 */
export const useSearchAuctions = (params: SearchParams) => {
  return useQuery({
    queryKey: auctionKeys.search(params),
    queryFn: () => searchClient.searchItems(params),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('4')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook para crear subasta
 */
export const useCreateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AuctionFormInput) => {
      const validatedData = AuctionService.validateAndTransformFormData(data);
      return auctionClient.createAuction(validatedData);
    },

    onSuccess: (newAuction: Auction) => {
      toast.success('¡Subasta creada exitosamente!', {
        description: `${newAuction.make} ${newAuction.model} ${newAuction.year}`,
        duration: 5000,
      });

      queryClient.invalidateQueries({ queryKey: auctionKeys.all });

      queryClient.setQueryData(auctionKeys.detail(newAuction.id), newAuction);
    },

    onError: (error: Error) => {
      toast.error('Error al crear la subasta', {
        description: error.message || 'Ha ocurrido un error inesperado',
        duration: 5000,
      });
    },
  });
};

/**
 * Hook para actualizar subasta
 */
export const useUpdateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateAuctionInput;
    }) => {
      const validatedData = AuctionService.validateUpdateData(data);
      return auctionClient.updateAuction(id, validatedData);
    },

    onSuccess: (_, { id }) => {
      toast.success('Subasta actualizada correctamente', {
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: auctionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: auctionKeys.all });
    },

    onError: (error: Error) => {
      toast.error('Error al actualizar la subasta', {
        description: error.message || 'Ha ocurrido un error inesperado',
        duration: 5000,
      });
    },
  });
};
