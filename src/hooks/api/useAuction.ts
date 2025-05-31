import { useQuery } from '@tanstack/react-query';
import { auctionClient } from '@/clients/AuctionClient';
import { QueryInvalidation, QueryKeys } from '@/libs/query-keys';
import { handleApiError } from '@/libs/error-handler';
import { Auction } from '@/models/schemas/auction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  CreateAuctionRequest,
  UpdateAuctionRequest,
} from '@/models/requests/auction';
import { toast } from 'sonner';

/**
 * Hook para obtener todas las auctions
 */
export const useGetAllAuctions = (date?: string) => {
  return useQuery<Auction[], Error>({
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
export const useGetOneAuction = (id: string) => {
  return useQuery<Auction, Error>({
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

/**
 * Hook para crear una nueva auction
 */
export const useCreateAuction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Auction, Error, CreateAuctionRequest>({
    mutationFn: async (auctionData: CreateAuctionRequest) => {
      try {
        // Validaciones adicionales antes de enviar
        if (!auctionData.make?.trim()) {
          throw new Error('La marca es requerida');
        }
        if (!auctionData.model?.trim()) {
          throw new Error('El modelo es requerido');
        }
        if (
          auctionData.year < 1900 ||
          auctionData.year > new Date().getFullYear() + 1
        ) {
          throw new Error('Año inválido');
        }
        if (auctionData.mileage < 0) {
          throw new Error('El kilometraje no puede ser negativo');
        }
        if (auctionData.reservePrice <= 0) {
          throw new Error('El precio de reserva debe ser mayor a 0');
        }
        if (new Date(auctionData.auctionEnd) <= new Date()) {
          throw new Error('La fecha de término debe ser futura');
        }

        return await auctionClient.createAuction(auctionData);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    onSuccess: newAuction => {
      // Mostrar notificación de éxito
      toast.success('¡Subasta creada exitosamente!', {
        description: `${newAuction.make} ${newAuction.model} ${newAuction.year}`,
        duration: 5000,
        action: {
          label: 'Ver subasta',
          onClick: () => router.push(`/auction/${newAuction.id}`),
        },
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

      // Prefetch de búsquedas relacionadas
      queryClient.invalidateQueries({
        queryKey: QueryInvalidation.auctionSearches(),
      });
    },

    onError: error => {
      // Mostrar toast de error si no fue manejado por handleApiError
      toast.error('Error al crear la subasta', {
        description: error.message || 'Ha ocurrido un error inesperado',
        duration: 5000,
      });
    },
  });
};

/**
 * Hook para actualizar una auction existente
 */
export const useUpdateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; data: UpdateAuctionRequest }>({
    mutationFn: async ({ id, data }) => {
      try {
        // Validaciones básicas
        if (!id?.trim()) {
          throw new Error('ID de subasta inválido');
        }

        return await auctionClient.updateAuction(id, data);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    onSuccess: (_, { id, data }) => {
      // Mostrar notificación de éxito
      toast.success('Subasta actualizada correctamente', {
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

      // Actualizar optimistamente el cache si tenemos los datos
      const currentData = queryClient.getQueryData<Auction>(
        QueryKeys.auctions.byId(id)
      );

      if (currentData) {
        queryClient.setQueryData(QueryKeys.auctions.byId(id), {
          ...currentData,
          ...data,
          updatedAt: new Date(),
        });
      }
    },

    onError: error => {
      toast.error('Error al actualizar la subasta', {
        description: error.message || 'Ha ocurrido un error inesperado',
        duration: 5000,
      });
    },
  });
};
