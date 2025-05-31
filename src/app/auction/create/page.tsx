'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import TextInput from '@/components/text-input/TextInput';
import DatepickerInput from '@/components/datepicker-input';

interface AuctionFormValues {
  make: string;
  model: string;
  year: number | '';
  color: string;
  mileage: number | '';
  imageUrl: string;
  reservePrice: number | '';
  auctionEnd: Date;
}

export default function CreateAuction() {
  const getMinAuctionEndDate = () => {
    const now = new Date();
    const minEndDate = new Date(now);
    minEndDate.setHours(now.getHours() + 24);
    return minEndDate;
  };

  const form = useForm<AuctionFormValues>({
    defaultValues: {
      make: '',
      model: '',
      year: '',
      color: '',
      mileage: '',
      imageUrl: '',
      reservePrice: '',
      auctionEnd: getMinAuctionEndDate(),
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: AuctionFormValues) => {
    const formattedData = {
      ...data,
      year: data.year === '' ? 0 : data.year,
      mileage: data.mileage === '' ? 0 : data.mileage,
      reservePrice: data.reservePrice === '' ? 0 : data.reservePrice,
    };

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Failed to create auction');
      }

      const result = await response.json();
      console.log('Auction created:', result);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Subastar mi auto
          </CardTitle>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextInput
                name="make"
                label="Marca"
                placeholder="Marca"
                rules={{ required: 'La marca es requerida' }}
                tooltip="Ingresa la marca del vehículo (ej: Toyota, Ford, etc.)"
              />

              <TextInput
                name="model"
                label="Modelo"
                placeholder="Modelo"
                rules={{ required: 'El modelo es requerido' }}
                tooltip="Ingresa el modelo específico del vehículo"
              />

              <TextInput
                name="year"
                label="Año"
                type="number"
                placeholder="Año"
                rules={{
                  required: 'El año es requerido',
                  min: {
                    value: 1900,
                    message: 'El año debe ser mayor o igual a 1900',
                  },
                  max: {
                    value: new Date().getFullYear() + 1,
                    message: 'Año inválido',
                  },
                }}
                tooltip="Año de fabricación del vehículo (1900 - presente)"
              />

              <TextInput
                name="color"
                label="Color"
                placeholder="Color"
                rules={{ required: 'El color es requerido' }}
                tooltip="Color principal del vehículo"
              />

              <TextInput
                name="mileage"
                label="Kilometraje"
                type="number"
                placeholder="Kilometraje"
                rules={{
                  required: 'El kilometraje es requerido',
                  min: {
                    value: 0,
                    message: 'El kilometraje no puede ser negativo',
                  },
                }}
                tooltip="Kilometraje actual del vehículo"
              />

              <TextInput
                name="imageUrl"
                label="URL de la imagen"
                type="url"
                placeholder="URL de la imagen"
                rules={{
                  required: 'La URL de la imagen es requerida',
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: 'Debe ser una URL válida',
                  },
                }}
                tooltip="URL de la imagen principal del vehículo (debe comenzar con http:// o https://)"
              />

              <TextInput
                name="reservePrice"
                label="Precio de reserva"
                type="number"
                placeholder="Precio de reserva"
                rules={{
                  required: 'El precio de reserva es requerido',
                  min: {
                    value: 0,
                    message: 'El precio de reserva no puede ser negativo',
                  },
                }}
                tooltip="Precio mínimo por el que estás dispuesto a vender el vehículo"
              />

              <DatepickerInput
                name="auctionEnd"
                label="Fecha de término"
                rules={{ required: 'La fecha de término es requerida' }}
                tooltip="La subasta debe tener una duración mínima de 24 horas a partir de ahora"
                showTime
                minDate={getMinAuctionEndDate()}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}
              >
                Subastar mi auto
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
