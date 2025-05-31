import { TSearchParams, TSearchResult } from '@/models/searchModel';
import { TAuction } from '@/models/auctionModel';
import queryString from 'query-string';
import AxiosClient from './AxiosClient';

class SearchClient extends AxiosClient {
  async searchItems(params: TSearchParams): Promise<TSearchResult<TAuction>> {
    try {
      const query = queryString.stringify(params, {
        skipNull: true,
        skipEmptyString: true,
      });

      const response = await this.axios.get<TSearchResult<TAuction>>(
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
