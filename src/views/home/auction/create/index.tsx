'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import TextInput from '@/components/form/text-input/TextInput';
import DatepickerInput from '@/components/form/datepicker-input';
import ErrorBoundary from '@/components/error-boundary';
import ErrorDisplay from '@/components/error-display';
import { useAuth } from '@/hooks/useAuth';
import { useCreateAuction } from '@/hooks/business/useAuctions';
import { useAuctionForm } from '@/hooks/form/useAuctionForm';
import { PERMISSIONS } from '@/config/constants';
import CreateAuctionLoadingSkeleton from './loading-skeleton';
import { CreateAuctionViewProps } from './types';
import { AuctionFormInput } from '@/schemas';
import {
  FORM_VALIDATION_RULES,
  FORM_PLACEHOLDERS,
  FORM_TOOLTIPS,
} from './constants';

const CreateAuctionView = ({ onSuccess, onCancel }: CreateAuctionViewProps) => {
  const router = useRouter();
  const { mutateAsync, isPending, error, reset } = useCreateAuction();
  const {
    isAuthenticated,
    isLoading: authLoading,
    user,
    hasPermission,
  } = useAuth();

  const form = useAuctionForm();

  const onSubmit = async (data: AuctionFormInput) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Debes iniciar sesión para crear una subasta');
      }

      if (!hasPermission(PERMISSIONS.CREATE_AUCTION)) {
        throw new Error('No tienes permisos para crear subastas');
      }

      reset();

      await mutateAsync(data);

      form.reset();

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/');
      }
    } catch {}
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (authLoading) {
    return <CreateAuctionLoadingSkeleton />;
  }

  return (
    <ErrorBoundary>
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <TextInput
                  name="make"
                  label="Marca"
                  placeholder={FORM_PLACEHOLDERS.MAKE}
                  rules={FORM_VALIDATION_RULES.MAKE}
                  tooltip={FORM_TOOLTIPS.MAKE}
                />

                <TextInput
                  name="model"
                  label="Modelo"
                  placeholder={FORM_PLACEHOLDERS.MODEL}
                  rules={FORM_VALIDATION_RULES.MODEL}
                  tooltip={FORM_TOOLTIPS.MODEL}
                />

                <TextInput
                  name="year"
                  label="Año"
                  type="number"
                  placeholder={FORM_PLACEHOLDERS.YEAR}
                  rules={FORM_VALIDATION_RULES.YEAR}
                  tooltip={FORM_TOOLTIPS.YEAR}
                />

                <TextInput
                  name="color"
                  label="Color"
                  placeholder={FORM_PLACEHOLDERS.COLOR}
                  rules={FORM_VALIDATION_RULES.COLOR}
                  tooltip={FORM_TOOLTIPS.COLOR}
                />

                <TextInput
                  name="mileage"
                  label="Kilometraje"
                  type="number"
                  placeholder={FORM_PLACEHOLDERS.MILEAGE}
                  rules={FORM_VALIDATION_RULES.MILEAGE}
                  tooltip={FORM_TOOLTIPS.MILEAGE}
                />

                <TextInput
                  name="imageUrl"
                  label="URL de la imagen"
                  type="url"
                  placeholder={FORM_PLACEHOLDERS.IMAGE_URL}
                  rules={FORM_VALIDATION_RULES.IMAGE_URL}
                  tooltip={FORM_TOOLTIPS.IMAGE_URL}
                />

                <TextInput
                  name="reservePrice"
                  label="Precio de reserva (USD)"
                  type="number"
                  placeholder={FORM_PLACEHOLDERS.RESERVE_PRICE}
                  rules={FORM_VALIDATION_RULES.RESERVE_PRICE}
                  tooltip={FORM_TOOLTIPS.RESERVE_PRICE}
                />

                <DatepickerInput
                  name="auctionEnd"
                  label="Fecha de término"
                  rules={FORM_VALIDATION_RULES.AUCTION_END}
                  tooltip={FORM_TOOLTIPS.AUCTION_END}
                  showTime
                />

                {error && (
                  <ErrorDisplay
                    title="Error al crear la subasta"
                    message={error.message || 'Ha ocurrido un error inesperado'}
                    variant="inline"
                  />
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
    </ErrorBoundary>
  );
};

export default CreateAuctionView;
