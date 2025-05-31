export interface PaginationButtonProps {
  type: 'previous' | 'next';
  className?: string;
  onClick: () => void;
}

export interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}
