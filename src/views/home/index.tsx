'use client';

import AppPagination from '@/components/pagination';
import { useParamsStore } from '@/stores/useParamsStore';
import { useAuctionSearch } from '@/hooks/api/auctions';
import { useShallow } from 'zustand/shallow';
import AuctionCard from './components/auction-card';
import EmptyState from './components/auction-card/EmptyState';
import FilterBar from './components/filter-bar';

const HomeView = () => {
  // Obtener parámetros del store de Zustand
  const params = useParamsStore(
    useShallow(state => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }))
  );
  const setParams = useParamsStore(state => state.setParams);

  // Usar React Query para la búsqueda de auctions
  const { data, isLoading, error, isFetching, isPlaceholderData } =
    useAuctionSearch(params);

  const handlePageChange = (pageNumber: number): void => {
    setParams({ pageNumber });
  };

  // Estados de loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <FilterBar />
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Cargando auctions...</div>
        </div>
      </div>
    );
  }

  // Estados de error
  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <FilterBar />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-red-600 mb-2">
              Error cargando los datos
            </h4>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay datos
  if (!data) {
    return (
      <div className="flex flex-col gap-4">
        <FilterBar />
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">No se pudieron cargar los datos</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterBar />

      {/* Indicador de que se están cargando nuevos datos */}
      {isFetching && !isLoading && (
        <div className="text-center py-2">
          <span className="text-sm text-gray-500">Actualizando...</span>
        </div>
      )}

      {data.results.length > 0 ? (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
              isFetching && isPlaceholderData ? 'opacity-50' : ''
            }`}
          >
            {data.results.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>

          <AppPagination
            currentPage={params.pageNumber}
            totalPages={data.pageCount}
            handlePageChange={handlePageChange}
          />

          {/* Información adicional */}
          <div className="text-center text-sm text-gray-500">
            Mostrando {data.results.length} de {data.totalCount} auctions
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default HomeView;
