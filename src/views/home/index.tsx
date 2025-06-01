'use client';

import { useParamsStore } from '@/stores/useParamsStore';
import { useShallow } from 'zustand/shallow';
import { useSearchAuctions } from '@/hooks/business/useAuctions';
import { useSearchParams } from '@/hooks/business/useSearchParams';
import ErrorBoundary from '@/components/error-boundary';
import ErrorDisplay from '@/components/error-display';
import AppPagination from '@/components/pagination';
import AuctionCard from './components/auction-card';
import EmptyState from './components/auction-card/EmptyState';
import FilterBar from './components/filter-bar';
import HomeLoadingSkeleton from './loading-skeleton';

const HomeView = () => {
  const storeParams = useParamsStore(
    useShallow(state => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }))
  );
  const setParams = useParamsStore(state => state.setParams);

  const searchParams = useSearchParams(storeParams);

  const { data, isLoading, error, isFetching, isPlaceholderData, refetch } =
    useSearchAuctions(searchParams);

  const handlePageChange = (pageNumber: number): void => {
    setParams({ pageNumber });
  };

  if (isLoading) {
    return <HomeLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <FilterBar />
        <ErrorDisplay
          title="Error cargando las subastas"
          message={error.message || 'Ha ocurrido un error inesperado'}
          onRetry={() => refetch()}
          retryText="Recargar subastas"
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-4">
        <FilterBar />
        <ErrorDisplay
          title="Sin datos"
          message="No se pudieron cargar las subastas"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-4">
        <FilterBar />

        {/* Indicador de carga */}
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
              currentPage={storeParams.pageNumber}
              totalPages={data.pageCount}
              handlePageChange={handlePageChange}
            />

            <div className="text-center text-sm text-gray-500">
              Mostrando {data.results.length} de {data.totalCount} subastas
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default HomeView;
