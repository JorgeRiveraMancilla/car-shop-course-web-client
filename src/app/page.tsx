'use client';

import AppPagination from '@/components/pagination';
import AuctionCard from '@/components/auction-card';
import EmptyState from '@/components/auction-card/EmptyState';
import AuctionFilter from '@/components/auction-filter';
import { useParamsStore } from '@/stores/useParamsStore';
import { TAuction } from '@/models/schemas/auction';
import searchClient from '@/services/SearchClient';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { TPaginationResponse } from '@/models/generics/pagination';

export default function Home() {
  const [data, setData] = useState<TPaginationResponse<TAuction>>();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await searchClient.searchItems(params);
        setData(result);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handlePageChange = (pageNumber: number): void => {
    setParams({ pageNumber });
  };

  if (loading) {
    return <h4>Cargando...</h4>;
  }

  if (!data) {
    return <h4>Error cargando los datos</h4>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AuctionFilter />

      {data.results.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.results.map((auction: TAuction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>

          <AppPagination
            currentPage={params.pageNumber}
            totalPages={data.pageCount}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
