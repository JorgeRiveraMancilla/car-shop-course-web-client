import { Skeleton } from '@/components/ui/skeleton';
import { ListSkeletonProps } from './types';

const ListSkeleton = ({
  count = 5,
  showImage = true,
  className = '',
}: ListSkeletonProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-4 border rounded-lg"
        >
          {showImage && <Skeleton className="h-12 w-12 rounded-full" />}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;
