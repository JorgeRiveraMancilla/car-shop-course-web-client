import { Auction } from '@/models/schemas/auction';

export interface CarImageProps {
  imageUrl: string;
}

export interface CountdownTimerProps {
  auctionEnd: string;
}

export interface AuctionCardProps {
  auction: Auction;
}
