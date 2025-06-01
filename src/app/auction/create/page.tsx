'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import CreateAuctionView from '@/views/home/auction/create';
import CreateAuctionLoadingSkeleton from '@/views/home/auction/create/loading-skeleton';
import ProtectedRoute from '@/components/auth/protected-route';
import { PERMISSIONS } from '@/config/constants';

export default function CreateAuctionPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ProtectedRoute
      redirectTo="/auth/sign-in"
      requiredPermissions={[PERMISSIONS.CREATE_AUCTION]}
      showFallback={true}
      fallback={<CreateAuctionLoadingSkeleton />}
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <Suspense fallback={<CreateAuctionLoadingSkeleton />}>
          <CreateAuctionView
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
