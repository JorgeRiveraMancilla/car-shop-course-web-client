import CardSkeleton from '@/components/skeleton/card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const HomeLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Filter bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-16" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* Cards skeleton */}
      <CardSkeleton count={12} />

      {/* Pagination skeleton */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Skeleton className="h-9 w-20" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-9" />
        ))}
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
};

export default HomeLoadingSkeleton;
