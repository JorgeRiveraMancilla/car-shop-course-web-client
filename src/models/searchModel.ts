export type SearchParams = {
  searchTerm?: string;
  pageSize: number;
  pageNumber: number;
  seller?: string;
  winner?: string;
  orderBy?: string;
  filterBy?: string;
};

export type SearchResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};
