import { PagedResult } from "@/models/PagedResult";
import AuctionCard from "../components/AuctionCard";
import { Auction } from "@/models/Auction";

async function getData(): Promise<PagedResult<Auction>> {
  const response = await fetch("http://localhost:6001/search");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="grid grid-cols-4 gap-6">
      {data &&
        data.results.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
    </div>
  );
}
