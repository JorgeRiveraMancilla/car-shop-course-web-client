import { Skeleton } from '@/components/ui/skeleton';
import { CardSkeletonProps } from './types';

const CardSkeleton = ({ count = 1, className = '' }: CardSkeletonProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card shadow">
          {/* Image skeleton */}
          <div className="p-0">
            <Skeleton className="aspect-video w-full rounded-t-xl" />
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
