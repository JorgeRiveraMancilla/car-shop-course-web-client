import { Auction } from '@/models/schemas/auction';
import AxiosClient from './AxiosClient';
import {
  CreateAuctionRequest,
  UpdateAuctionRequest,
} from '@/models/requests/auction';

/**
 * Cliente para manejar operaciones de subastas
 */
class AuctionClient extends AxiosClient {
  private readonly endpoint = '/auction';

  constructor() {
    super();
  }

  /**
   * Obtiene todas las subastas con filtrado opcional por fecha
   */
  async getAllAuctions(date?: string): Promise<Auction[]> {
    try {
      const params = date ? { date } : undefined;
      const response = await this.axios.get<Auction[]>(this.endpoint, {
        params,
      });

      // Validar que la respuesta sea un array
      if (!Array.isArray(response.data)) {
        throw new Error('Respuesta inválida del servidor');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene una subasta por su ID
   */
  async getAuctionById(id: string): Promise<Auction> {
    try {
      const response = await this.axios.get<Auction>(`${this.endpoint}/${id}`);

      if (!response.data) {
        throw new Error('Subasta no encontrada');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crea una nueva subasta
   */
  async createAuction(auction: CreateAuctionRequest): Promise<Auction> {
    try {
      const response = await this.axios.post<Auction>(this.endpoint, auction);

      if (!response.data) {
        throw new Error('Error al crear la subasta');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza una subasta existente
   */
  async updateAuction(
    id: string,
    auction: UpdateAuctionRequest
  ): Promise<void> {
    try {
      await this.axios.put(`${this.endpoint}/${id}`, auction);
    } catch (error) {
      throw error;
    }
  }
}

export const auctionClient = new AuctionClient();
export default auctionClient;
