export type TAuction = {
  id: string;
  reservePrice: number;
  seller: string;
  winner?: string;
  soldAmount?: number;
  currentHighBid?: number;
  createdAt: Date;
  updatedAt: Date;
  auctionEnd: Date;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
};

export type TCreateAuction = {
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  reservePrice: number;
  auctionEnd: Date;
};

export type TUpdateAuction = {
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  mileage?: number;
};
