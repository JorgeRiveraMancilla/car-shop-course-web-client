import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

type Props = {
  auction: unknown;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <a href="#">
      <div className="relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden">
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.end} />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>

        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </a>
  );
}
