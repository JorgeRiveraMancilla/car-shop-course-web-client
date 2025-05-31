export type TSearchParams = {
  searchTerm?: string;
  pageSize: number;
  pageNumber: number;
  seller?: string;
  winner?: string;
  orderBy?: string;
  filterBy?: string;
};

export type TSearchResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};
