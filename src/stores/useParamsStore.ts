import { StoreParams } from '@/schemas';
import { create } from 'zustand';

type State = StoreParams & {
  searchValue: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
  setSearchValue: (value: string) => void;
};

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  searchTerm: undefined,
  searchValue: '',
  orderBy: 'make',
  filterBy: 'live',
};

export const useParamsStore = create<State & Actions>()(set => ({
  ...initialState,
  setParams: (newParams: Partial<State>) => {
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
