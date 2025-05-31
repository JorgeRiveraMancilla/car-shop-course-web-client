import { Auction } from '@/models/schemas/auction';
import AxiosClient from './AxiosClient';
import {
  CreateAuctionRequest,
  UpdateAuctionRequest,
} from '@/models/requests/auction';

class AuctionClient extends AxiosClient {
  constructor() {
    super();
  }

  async getAllAuctions(date?: string): Promise<Auction[]> {
    const params = date ? { date } : undefined;
    const response = await this.axios.get<Auction[]>('/auction', {
      params,
    });
    return response.data;
  }

  async getAuctionById(id: string): Promise<Auction> {
    const response = await this.axios.get<Auction>(`/auction/${id}`);
    return response.data;
  }

  async createAuction(auction: CreateAuctionRequest): Promise<Auction> {
    const response = await this.axios.post<Auction>('/auction', auction);
    return response.data;
  }

  async updateAuction(
    id: string,
    auction: UpdateAuctionRequest
  ): Promise<void> {
    await this.axios.put(`/auction/${id}`, auction);
  }

  async deleteAuction(id: string): Promise<void> {
    await this.axios.delete(`/auction/${id}`);
  }
}

export const auctionClient = new AuctionClient();

export default auctionClient;
