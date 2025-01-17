import AuctionCard from "../components/AuctionCard";

async function getData(): Promise<unknown> {
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
        data.results.map((result: any) => (
          <AuctionCard key={result.id} {...result} />
        ))}
    </div>
  );
}
