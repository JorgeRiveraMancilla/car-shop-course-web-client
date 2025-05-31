import { TSearchParams, TSearchResult } from '@/models/searchModel';
import { Auction } from '@/models/auctionModel';
import queryString from 'query-string';
import AxiosClient from './AxiosClient';

class SearchClient extends AxiosClient {
  async searchItems(params: TSearchParams): Promise<TSearchResult<Auction>> {
    try {
      const query = queryString.stringify(params, {
        skipNull: true,
        skipEmptyString: true,
      });

      const response = await this.axios.get<TSearchResult<Auction>>(
        `/search?${query}`
      );

      return response.data;
    } catch (error) {
      console.error('SearchClient Error:', error);
      throw error;
    }
  }
}

export const searchClient = new SearchClient();

export default searchClient;
