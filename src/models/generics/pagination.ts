export type TPaginationResponse<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};
