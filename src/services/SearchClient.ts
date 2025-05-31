import { TAuction } from '@/models/schemas/auction';
import queryString from 'query-string';
import AxiosClient from './AxiosClient';
import { TPaginationResponse } from '@/models/generics/pagination';
import { TSearchQueryParams } from '@/models/requests/search';

class SearchClient extends AxiosClient {
  async searchItems(
    params: TSearchQueryParams
  ): Promise<TPaginationResponse<TAuction>> {
    try {
      const query = queryString.stringify(params, {
        skipNull: true,
        skipEmptyString: true,
      });

      const response = await this.axios.get<TPaginationResponse<TAuction>>(
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
