import { Suspense } from 'react';
import HomeView from '@/views/home';
import HomeLoadingSkeleton from '@/views/home/loading-skeleton';

export default function HomePage() {
  return (
    <Suspense fallback={<HomeLoadingSkeleton />}>
      <HomeView />
    </Suspense>
  );
}
