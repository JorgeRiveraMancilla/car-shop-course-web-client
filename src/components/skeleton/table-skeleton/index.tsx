import { Skeleton } from '@/components/ui/skeleton';
import { TableSkeletonProps } from './types';

const TableSkeleton = ({
  rows = 5,
  columns = 4,
  className = '',
}: TableSkeletonProps) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header skeleton */}
      <div className="flex space-x-4 p-4 border-b">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-4 flex-1" />
        ))}
      </div>

      {/* Rows skeleton */}
      <div className="space-y-1">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4 p-4 border-b">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
