import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchFormSchema, SearchFormParams } from '@/schemas';

export const useSearchForm = (defaultValues?: Partial<SearchFormParams>) => {
  return useForm<SearchFormParams>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      pageNumber: 1,
      pageSize: 12,
      orderBy: 'make',
      filterBy: 'live',
      ...defaultValues,
    },
    mode: 'onChange',
  });
};
