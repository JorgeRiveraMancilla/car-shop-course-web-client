export type TPagedResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};
