import { Auction, CreateAuction, UpdateAuction } from "@/models/auctionModel";
import AxiosClient from "./AxiosClient";

class AuctionClient extends AxiosClient {
  constructor() {
    super();
  }

  async getAllAuctions(date?: string): Promise<Auction[]> {
    const params = date ? { date } : undefined;
    const response = await this.axios.get<Auction[]>("/auction", {
      params,
    });
    return response.data;
  }

  async getAuctionById(id: string): Promise<Auction> {
    const response = await this.axios.get<Auction>(`/auction/${id}`);
    return response.data;
  }

  async createAuction(auction: CreateAuction): Promise<Auction> {
    const response = await this.axios.post<Auction>("/auction", auction);
    return response.data;
  }

  async updateAuction(id: string, auction: UpdateAuction): Promise<void> {
    await this.axios.put(`/auction/${id}`, auction);
  }

  async deleteAuction(id: string): Promise<void> {
    await this.axios.delete(`/auction/${id}`);
  }
}

export const auctionClient = new AuctionClient();

export default auctionClient;
