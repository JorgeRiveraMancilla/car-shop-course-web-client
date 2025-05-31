import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auctionClient } from '@/clients/AuctionClient';
import { QueryKeys, QueryInvalidation } from '@/libs/query-keys';
import { handleApiError } from '@/libs/error-handler';
import { TAuction } from '@/models/schemas/auction';
import {
  TCreateAuctionRequest,
  TUpdateAuctionRequest,
} from '@/models/requests/auction';
import { toast } from 'sonner';

/**
 * Hook para crear una nueva auction
 */
export const useCreateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation<TAuction, Error, TCreateAuctionRequest>({
    mutationFn: async auctionData => {
      try {
        return await auctionClient.createAuction(auctionData);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    onSuccess: newAuction => {
      // Mostrar notificación de éxito
      toast.success('¡Auction creada exitosamente!', {
        description: `${newAuction.make} ${newAuction.model} ${newAuction.year}`,
        duration: 4000,
      });

      // Invalidar todas las queries de auctions para que se actualicen
      queryClient.invalidateQueries({
        queryKey: QueryInvalidation.allAuctions(),
      });

      // Agregar la nueva auction al cache
      queryClient.setQueryData(
        QueryKeys.auctions.byId(newAuction.id),
        newAuction
      );
    },

    onError: error => {
      console.error('Error creating auction:', error);
      // El error ya fue mostrado por handleApiError
    },
  });
};

/**
 * Hook para actualizar una auction existente
 */
export const useUpdateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; data: TUpdateAuctionRequest }>({
    mutationFn: async ({ id, data }) => {
      try {
        return await auctionClient.updateAuction(id, data);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    onSuccess: (_, { id }) => {
      // Mostrar notificación de éxito
      toast.success('Auction actualizada correctamente', {
        duration: 3000,
      });

      // Invalidar la auction específica
      queryClient.invalidateQueries({
        queryKey: QueryKeys.auctions.byId(id),
      });

      // Invalidar las búsquedas para reflejar cambios
      queryClient.invalidateQueries({
        queryKey: QueryInvalidation.auctionSearches(),
      });

      // Invalidar la lista general
      queryClient.invalidateQueries({
        queryKey: [...QueryKeys.auctions.all, 'list'],
      });
    },

    onError: error => {
      console.error('Error updating auction:', error);
    },
  });
};

/**
 * Hook para eliminar una auction
 */
export const useDeleteAuction = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async id => {
      try {
        return await auctionClient.deleteAuction(id);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    onSuccess: (_, id) => {
      // Mostrar notificación de éxito
      toast.success('Auction eliminada correctamente', {
        duration: 3000,
      });

      // Remover de todas las queries que puedan contener esta auction
      queryClient.removeQueries({
        queryKey: QueryKeys.auctions.byId(id),
      });

      // Invalidar búsquedas y listas
      queryClient.invalidateQueries({
        queryKey: QueryInvalidation.allAuctions(),
      });
    },

    onError: error => {
      console.error('Error deleting auction:', error);
    },
  });
};

/**
 * Hook que combina todas las mutaciones para facilidad de uso
 */
export const useAuctionMutations = () => {
  const createMutation = useCreateAuction();
  const updateMutation = useUpdateAuction();
  const deleteMutation = useDeleteAuction();

  return {
    // Mutaciones
    createAuction: createMutation.mutate,
    updateAuction: updateMutation.mutate,
    deleteAuction: deleteMutation.mutate,

    // Estados async
    createAsync: createMutation.mutateAsync,
    updateAsync: updateMutation.mutateAsync,
    deleteAsync: deleteMutation.mutateAsync,

    // Estados de loading
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Estados de error
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,

    // Reset de estados
    resetCreate: createMutation.reset,
    resetUpdate: updateMutation.reset,
    resetDelete: deleteMutation.reset,
  };
};
