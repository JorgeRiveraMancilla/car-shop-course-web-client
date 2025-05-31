'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TPaginationButtonProps = {
  className?: string;
  onClick: () => void;
};

type TAppPaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export default function AppPagination({
  currentPage,
  totalPages,
  handlePageChange,
}: TAppPaginationProps) {
  const CustomPaginationPrevious = ({
    className,
    onClick,
  }: TPaginationButtonProps) => (
    <Button
      variant="outline"
      className={`gap-1 pl-2.5 ${className}`}
      onClick={onClick}
    >
      <ChevronLeft className="h-4 w-4" />

      <span>Anterior</span>
    </Button>
  );

  const CustomPaginationNext = ({
    className,
    onClick,
  }: TPaginationButtonProps) => (
    <Button
      variant="outline"
      className={`gap-1 pr-2.5 ${className}`}
      onClick={onClick}
    >
      <span>Siguiente</span>

      <ChevronRight className="h-4 w-4" />
    </Button>
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <CustomPaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={
              currentPage <= 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          if (
            page === 1 ||
            page === totalPages ||
            page === currentPage ||
            page === currentPage - 1 ||
            page === currentPage + 1
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer hover:bg-muted"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        <PaginationItem>
          <CustomPaginationNext
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            className={
              currentPage >= totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
