export type TCreateAuctionRequest = {
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  reservePrice: number;
  auctionEnd: Date;
};

export type TUpdateAuctionRequest = {
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  mileage?: number;
};
