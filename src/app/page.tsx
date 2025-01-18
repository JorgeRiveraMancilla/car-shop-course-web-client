import AppPagination from "@/components/AppPagination";
import AuctionCard from "@/components/AuctionCard";
import { Auction } from "@/models/Auction";
import { PagedResult } from "@/models/PagedResult";

async function getData(pageNumber: number = 1): Promise<PagedResult<Auction>> {
  const response = await fetch(
    `http://localhost:6001/search?pageSize=8&pageNumber=${pageNumber}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

type Props = {
  searchParams: {
    page: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const data = await getData(page);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {data.results.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>

      <AppPagination currentPage={page} totalPages={data.pageCount} />
    </div>
  );
}
