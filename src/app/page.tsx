"use client";

import { getData } from "@/actions/auction";
import AppPagination from "@/components/AppPagination";
import AuctionCard from "@/components/AuctionCard";
import { Auction } from "@/models/Auction";
import { useEffect, useState } from "react";

export default function Home() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getData(pageNumber).then((data) => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    });
  }, [pageNumber]);

  if (!auctions || auctions.length == 0) {
    return <h4>Cargando...</h4>;
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {auctions.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>

      <AppPagination
        currentPage={pageNumber}
        totalPages={pageCount}
        handlePageChange={setPageNumber}
      />
    </div>
  );
}
