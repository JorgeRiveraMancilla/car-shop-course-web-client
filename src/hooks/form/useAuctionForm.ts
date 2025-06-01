import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auctionFormSchema, AuctionFormInput } from '@/schemas';
import { AuctionService } from '@/services';

export const useAuctionForm = (defaultValues?: Partial<AuctionFormInput>) => {
  const form = useForm<AuctionFormInput>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues: {
      make: '',
      model: '',
      year: '',
      color: '',
      mileage: '',
      imageUrl: '',
      reservePrice: '',
      auctionEnd: AuctionService.getMinAuctionEndDate(),
      ...defaultValues,
    },
    mode: 'onTouched',
  });

  const validateAndTransform = (data: AuctionFormInput) => {
    return AuctionService.validateAndTransformFormData(data);
  };

  return {
    ...form,
    validateAndTransform,
  };
};
