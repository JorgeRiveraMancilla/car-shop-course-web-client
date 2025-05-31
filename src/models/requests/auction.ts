export interface CreateAuctionRequest {
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  reservePrice: number;
  auctionEnd: Date;
}

export interface UpdateAuctionRequest {
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  mileage?: number;
}
