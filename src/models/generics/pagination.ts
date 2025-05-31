export interface PaginationResponse<T> {
  results: T[];
  pageCount: number;
  totalCount: number;
}
