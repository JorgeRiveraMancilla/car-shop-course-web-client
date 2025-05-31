import {
  TAuction,
  TCreateAuction,
  TUpdateAuction,
} from '@/models/auctionModel';
import AxiosClient from './AxiosClient';

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

  async createAuction(auction: TCreateAuction): Promise<TAuction> {
    const response = await this.axios.post<TAuction>('/auction', auction);
    return response.data;
  }

  async updateAuction(id: string, auction: TUpdateAuction): Promise<void> {
    await this.axios.put(`/auction/${id}`, auction);
  }

  async deleteAuction(id: string): Promise<void> {
    await this.axios.delete(`/auction/${id}`);
  }
}

export const auctionClient = new AuctionClient();

export default auctionClient;
