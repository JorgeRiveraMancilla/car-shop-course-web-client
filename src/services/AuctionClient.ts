import { AxiosHeaders } from "axios";
import { Auction, CreateAuction, UpdateAuction } from "@/models/auctionModel";
import { auth } from "@/auth";
import AxiosClient, { IAxiosConfig } from "./axiosClient";

class AuctionClient extends AxiosClient {
  constructor(config: IAxiosConfig) {
    super({ baseUrl: config.baseUrl });

    // Configurar el interceptor para incluir el token
    this.axios.interceptors.request.use(
      async (config) => {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        try {
          const session = await auth();
          if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          }
        } catch (error) {
          console.error("Error getting session:", error);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getAllAuctions(date?: string): Promise<Auction[]> {
    const params = date ? { date } : undefined;
    const response = await this.axios.get<Auction[]>("/api/auction", {
      params,
    });
    return response.data;
  }

  async getAuctionById(id: string): Promise<Auction> {
    const response = await this.axios.get<Auction>(`/api/auction/${id}`);
    return response.data;
  }

  async createAuction(auction: CreateAuction): Promise<Auction> {
    const response = await this.axios.post<Auction>("/api/auction", auction);
    return response.data;
  }

  async updateAuction(id: string, auction: UpdateAuction): Promise<void> {
    await this.axios.put(`/api/auction/${id}`, auction);
  }

  async deleteAuction(id: string): Promise<void> {
    await this.axios.delete(`/api/auction/${id}`);
  }
}

export const auctionClient = new AuctionClient({
  baseUrl: process.env.NEXT_PUBLIC_BACK_URL ?? "",
});

export default auctionClient;
