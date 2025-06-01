import { Skeleton } from '@/components/ui/skeleton';

const CreateAuctionLoadingSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="border-0 shadow-md rounded-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionLoadingSkeleton;
