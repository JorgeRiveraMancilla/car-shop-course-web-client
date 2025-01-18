"use client";

import { getData } from "@/actions/auction";
import AppPagination from "@/components/AppPagination";
import AuctionCard from "@/components/auction-card/AuctionCard";
import AuctionFilter from "@/components/AuctionFilter";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Auction } from "@/models/Auction";
import { PagedResult } from "@/models/PagedResult";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function Home() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
    }))
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = queryString.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number): void {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) {
    return <h4>Cargando...</h4>;
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-6">
      <AuctionFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>

      <AppPagination
        currentPage={params.pageNumber}
        totalPages={data.pageCount}
        handlePageChange={setPageNumber}
      />
    </div>
  );
}
