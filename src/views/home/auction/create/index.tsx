'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import TextInput from '@/components/form/text-input/TextInput';
import DatepickerInput from '@/components/form/datepicker-input';
import { useAuth } from '@/hooks/useAuth';
import {
  AuctionFormValues,
  AuctionFormProps,
  mapFormValuesToRequest,
} from './types';
import {
  ERROR_MESSAGES,
  PLACEHOLDERS,
  TOOLTIPS,
  AUCTION_VALIDATION,
  getMinAuctionEndDate,
} from './constants';
import { useCreateAuction } from '@/hooks/api/useAuction';

const CreateAuctionView = ({ onSuccess, onCancel }: AuctionFormProps) => {
  const router = useRouter();
  const { mutateAsync, isPending, error, reset } = useCreateAuction();
  const {
    isAuthenticated,
    isLoading: authLoading,
    user,
    hasPermission,
  } = useAuth();

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
    try {
      // Verificar autenticación antes de proceder
      if (!isAuthenticated) {
        throw new Error('Debes iniciar sesión para crear una subasta');
      }

      // Verificar permisos
      if (!hasPermission('create_auction')) {
        throw new Error('No tienes permisos para crear subastas');
      }

      // Resetear errores previos
      reset();

      // Convertir los datos del formulario al formato de request
      const requestData = mapFormValuesToRequest(data);

      // Crear la subasta usando el hook (ya incluye autenticación automática)
      await mutateAsync(requestData);

      // Resetear el formulario después del éxito
      form.reset({
        make: '',
        model: '',
        year: '',
        color: '',
        mileage: '',
        imageUrl: '',
        reservePrice: '',
        auctionEnd: getMinAuctionEndDate(),
      });

      // Ejecutar callback de éxito si existe
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirigir por defecto a la página principal
        router.push('/');
      }
    } catch {}
  };

  // Resetear errores cuando el componente se desmonta
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Mostrar loading si estamos verificando autenticación
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Subastar mi auto
          </CardTitle>
          {user && (
            <p className="text-center text-gray-600 mt-2">
              Hola {user.username || user.name}, completa los datos de tu
              vehículo
            </p>
          )}
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextInput
                name="make"
                label="Marca"
                placeholder={PLACEHOLDERS.MAKE}
                rules={{
                  required: ERROR_MESSAGES.MAKE.REQUIRED,
                  minLength: {
                    value: AUCTION_VALIDATION.MAKE.MIN_LENGTH,
                    message: ERROR_MESSAGES.MAKE.MIN_LENGTH,
                  },
                  maxLength: {
                    value: AUCTION_VALIDATION.MAKE.MAX_LENGTH,
                    message: ERROR_MESSAGES.MAKE.MAX_LENGTH,
                  },
                }}
                tooltip={TOOLTIPS.MAKE}
              />

              <TextInput
                name="model"
                label="Modelo"
                placeholder={PLACEHOLDERS.MODEL}
                rules={{
                  required: ERROR_MESSAGES.MODEL.REQUIRED,
                  minLength: {
                    value: AUCTION_VALIDATION.MODEL.MIN_LENGTH,
                    message: ERROR_MESSAGES.MODEL.MIN_LENGTH,
                  },
                  maxLength: {
                    value: AUCTION_VALIDATION.MODEL.MAX_LENGTH,
                    message: ERROR_MESSAGES.MODEL.MAX_LENGTH,
                  },
                }}
                tooltip={TOOLTIPS.MODEL}
              />

              <TextInput
                name="year"
                label="Año"
                type="number"
                placeholder={PLACEHOLDERS.YEAR}
                rules={{
                  required: ERROR_MESSAGES.YEAR.REQUIRED,
                  min: {
                    value: AUCTION_VALIDATION.YEAR.MIN,
                    message: ERROR_MESSAGES.YEAR.MIN,
                  },
                  max: {
                    value: AUCTION_VALIDATION.YEAR.MAX,
                    message: ERROR_MESSAGES.YEAR.MAX,
                  },
                }}
                tooltip={TOOLTIPS.YEAR}
              />

              <TextInput
                name="color"
                label="Color"
                placeholder={PLACEHOLDERS.COLOR}
                rules={{
                  required: ERROR_MESSAGES.COLOR.REQUIRED,
                  minLength: {
                    value: AUCTION_VALIDATION.COLOR.MIN_LENGTH,
                    message: ERROR_MESSAGES.COLOR.MIN_LENGTH,
                  },
                  maxLength: {
                    value: AUCTION_VALIDATION.COLOR.MAX_LENGTH,
                    message: ERROR_MESSAGES.COLOR.MAX_LENGTH,
                  },
                }}
                tooltip={TOOLTIPS.COLOR}
              />

              <TextInput
                name="mileage"
                label="Kilometraje"
                type="number"
                placeholder={PLACEHOLDERS.MILEAGE}
                rules={{
                  required: ERROR_MESSAGES.MILEAGE.REQUIRED,
                  min: {
                    value: AUCTION_VALIDATION.MILEAGE.MIN,
                    message: ERROR_MESSAGES.MILEAGE.MIN,
                  },
                  max: {
                    value: AUCTION_VALIDATION.MILEAGE.MAX,
                    message: ERROR_MESSAGES.MILEAGE.MAX,
                  },
                }}
                tooltip={TOOLTIPS.MILEAGE}
              />

              <TextInput
                name="imageUrl"
                label="URL de la imagen"
                type="url"
                placeholder={PLACEHOLDERS.IMAGE_URL}
                rules={{
                  required: ERROR_MESSAGES.IMAGE_URL.REQUIRED,
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                    message: ERROR_MESSAGES.IMAGE_URL.INVALID,
                  },
                }}
                tooltip={TOOLTIPS.IMAGE_URL}
              />

              <TextInput
                name="reservePrice"
                label="Precio de reserva (USD)"
                type="number"
                placeholder={PLACEHOLDERS.RESERVE_PRICE}
                rules={{
                  required: ERROR_MESSAGES.RESERVE_PRICE.REQUIRED,
                  min: {
                    value: AUCTION_VALIDATION.RESERVE_PRICE.MIN,
                    message: ERROR_MESSAGES.RESERVE_PRICE.MIN,
                  },
                  max: {
                    value: AUCTION_VALIDATION.RESERVE_PRICE.MAX,
                    message: ERROR_MESSAGES.RESERVE_PRICE.MAX,
                  },
                }}
                tooltip={TOOLTIPS.RESERVE_PRICE}
              />

              <DatepickerInput
                name="auctionEnd"
                label="Fecha de término"
                rules={{ required: ERROR_MESSAGES.AUCTION_END.REQUIRED }}
                tooltip={TOOLTIPS.AUCTION_END}
                showTime
                minDate={getMinAuctionEndDate()}
              />

              {/* Mostrar errores del API si existen */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  <p className="text-sm">
                    {error.message ||
                      'Error al crear la subasta. Inténtalo nuevamente.'}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={
                    !form.formState.isValid || isPending || !isAuthenticated
                  }
                >
                  {isPending ? 'Creando subasta...' : 'Subastar mi auto'}
                </Button>

                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isPending}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                )}
              </div>

              {/* Información adicional */}
              <div className="text-center text-sm text-gray-500 mt-4">
                Al crear una subasta, aceptas nuestros{' '}
                <a href="/terms" className="text-blue-600 hover:underline">
                  términos y condiciones
                </a>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAuctionView;
