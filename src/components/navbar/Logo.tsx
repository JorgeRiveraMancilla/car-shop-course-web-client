'use client';

import { useParamsStore } from '@/stores/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineCar } from 'react-icons/ai';

export default function Logo() {
  const reset = useParamsStore(state => state.reset);
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    if (pathname !== '/') {
      router.push('/');
    }
    reset();
  }

  return (
    <div
      className="flex items-center gap-2 text-2xl font-semibold text-red-500 cursor-pointer"
      onClick={handleClick}
    >
      <AiOutlineCar size={34} />

      <span>Subastas</span>
    </div>
  );
}
