import { Auction } from "@/models/auctionModel";
import CarImage from "./CarImage";
import CountdownTimer from "./CountdownTimer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Card className="group hover:shadow-lg transition overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <CarImage imageUrl={auction.imageUrl} />

          <div className="absolute bottom-2 left-2">
            <CountdownTimer auctionEnd={auction.auctionEnd.toISOString()} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4">
        <h3 className="font-semibold text-sm text-gray-700">
          {auction.make} {auction.model}
        </h3>

        <p className="font-semibold text-sm">{auction.year}</p>
      </CardFooter>
    </Card>
  );
}
