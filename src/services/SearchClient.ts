import AxiosClient, { IAxiosConfig } from "./AxiosClient";
import { SearchParams, SearchResult } from "@/models/searchModel";
import { Auction } from "@/models/auctionModel";
import queryString from "query-string";

class SearchClient extends AxiosClient {
  constructor(config: IAxiosConfig) {
    super({ baseUrl: config.baseUrl });
  }

  async searchItems(params: SearchParams): Promise<SearchResult<Auction>> {
    const query = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    });
    const response = await this.axios.get<SearchResult<Auction>>(
      `/api/search?${query}`
    );
    return response.data;
  }
}

export const searchClient = new SearchClient({
  baseUrl: process.env.NEXT_PUBLIC_SEARCH_URL ?? "",
});

export default searchClient;
