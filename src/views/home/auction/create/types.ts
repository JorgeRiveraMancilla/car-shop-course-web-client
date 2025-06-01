import { CreateAuctionRequest } from '@/models/requests/auction';

export interface AuctionFormValues {
  make: string;
  model: string;
  year: string; // Como string en el form, se convierte a number antes de enviar
  color: string;
  mileage: string; // Como string en el form, se convierte a number antes de enviar
  imageUrl: string;
  reservePrice: string; // Como string en el form, se convierte a number antes de enviar
  auctionEnd: Date;
}

export interface AuctionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Función helper para convertir form values a request
export const mapFormValuesToRequest = (
  values: AuctionFormValues
): CreateAuctionRequest => {
  return {
    make: values.make.trim(),
    model: values.model.trim(),
    year: values.year === '' ? new Date().getFullYear() : parseInt(values.year),
    color: values.color.trim(),
    mileage: values.mileage === '' ? 0 : parseInt(values.mileage),
    imageUrl: values.imageUrl.trim(),
    reservePrice:
      values.reservePrice === '' ? 0 : parseInt(values.reservePrice),
    auctionEnd: values.auctionEnd,
  };
};
