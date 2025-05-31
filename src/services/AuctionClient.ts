import { TAuction } from '@/models/schemas/auction';
import AxiosClient from './AxiosClient';
import {
  TCreateAuctionRequest,
  TUpdateAuctionRequest,
} from '@/models/requests/auction';

class AuctionClient extends AxiosClient {
  constructor() {
    super();
  }

  async getAllAuctions(date?: string): Promise<TAuction[]> {
    const params = date ? { date } : undefined;
    const response = await this.axios.get<TAuction[]>('/auction', {
      params,
    });
    return response.data;
  }

  async getAuctionById(id: string): Promise<TAuction> {
    const response = await this.axios.get<TAuction>(`/auction/${id}`);
    return response.data;
  }

  async createAuction(auction: TCreateAuctionRequest): Promise<TAuction> {
    const response = await this.axios.post<TAuction>('/auction', auction);
    return response.data;
  }

  async updateAuction(
    id: string,
    auction: TUpdateAuctionRequest
  ): Promise<void> {
    await this.axios.put(`/auction/${id}`, auction);
  }

  async deleteAuction(id: string): Promise<void> {
    await this.axios.delete(`/auction/${id}`);
  }
}

export const auctionClient = new AuctionClient();

export default auctionClient;
