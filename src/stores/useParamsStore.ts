import { SearchQueryParams } from '@/models/requests/search';
import { create } from 'zustand';

type State = SearchQueryParams & {
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
  searchTerm: '',
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
