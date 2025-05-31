import { TSearchParams } from '@/models/searchModel';
import { create } from 'zustand';

type TState = TSearchParams & {
  searchValue: string;
};

type TActions = {
  setParams: (params: Partial<TState>) => void;
  reset: () => void;
  setSearchValue: (value: string) => void;
};

const initialState: TState = {
  pageNumber: 1,
  pageSize: 12,
  searchTerm: '',
  searchValue: '',
  orderBy: 'make',
  filterBy: 'live',
};

export const useParamsStore = create<TState & TActions>()(set => ({
  ...initialState,
  setParams: (newParams: Partial<TState>) => {
    set(state => {
      if (newParams.pageNumber) {
        return {
          ...state,
          pageNumber: newParams.pageNumber,
        };
      } else {
        return {
          ...state,
          ...newParams,
          pageNumber: 1,
        };
      }
    });
  },
  reset: () => set(initialState),
  setSearchValue: (value: string) => set({ searchValue: value }),
}));
