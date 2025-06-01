'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import CreateAuctionView from '@/views/home/auction/create';
import ProtectedRoute from '@/components/auth/protected-route';
import { PERMISSIONS } from '@/libs/auth-config';

/**
 * Componente de loading para la página
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600">Cargando formulario...</p>
    </div>
  </div>
);

/**
 * Contenido principal de la página (ya protegido)
 */
const CreateAuctionContent = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirigir al home después de crear exitosamente
    router.push('/');
  };

  const handleCancel = () => {
    // Volver a la página anterior
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <CreateAuctionView onSuccess={handleSuccess} onCancel={handleCancel} />
      </Suspense>
    </div>
  );
};

/**
 * Página principal para crear una subasta (protegida)
 * Integrada con tu configuración existente de NextAuth
 */
export default function CreateAuctionPage() {
  return (
    <ProtectedRoute
      redirectTo="/auth/sign-in"
      requiredPermissions={[PERMISSIONS.CREATE_AUCTION]}
      showFallback={true}
      fallback={<LoadingSpinner />}
    >
      <CreateAuctionContent />
    </ProtectedRoute>
  );
}
