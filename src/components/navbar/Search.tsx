'use client';

import { useParamsStore } from '@/hooks/useParamsStore';
import { ChangeEvent, FormEvent } from 'react';
import { Input } from '../ui/input';
import { CiSearch } from 'react-icons/ci';
import { usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const setParams = useParamsStore(state => state.setParams);
  const searchValue = useParamsStore(state => state.searchValue);
  const setSearchValue = useParamsStore(state => state.setSearchValue);
  const searchInputId = 'search-input';
  const router = useRouter();
  const pathname = usePathname();

  function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/');
    }
    setParams({ searchTerm: searchValue.trim() });
  }

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="relative max-w-md">
        <label
          htmlFor={searchInputId}
          className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
        >
          <CiSearch />
        </label>

        <Input
          id={searchInputId}
          placeholder="Buscar autos..."
          className="pl-8 w-full bg-white border-gray-300"
          value={searchValue}
          onChange={onChangeSearch}
        />
      </form>
    </div>
  );
}
