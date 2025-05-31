import { Auction } from '@/models/schemas/auction';
import queryString from 'query-string';
import AxiosClient from './AxiosClient';
import { PaginationResponse } from '@/models/generics/pagination';
import { SearchQueryParams } from '@/models/requests/search';

class SearchClient extends AxiosClient {
  async searchItems(
    params: SearchQueryParams
  ): Promise<PaginationResponse<Auction>> {
    try {
      const query = queryString.stringify(params, {
        skipNull: true,
        skipEmptyString: true,
      });

      const response = await this.axios.get<PaginationResponse<Auction>>(
        `/search?${query}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const searchClient = new SearchClient();

export default searchClient;
