'use client';

import { ReactNode } from 'react';
import ErrorBoundary from '@/components/error-boundary';

interface ErrorBoundaryProviderProps {
  children: ReactNode;
}

export default function ErrorBoundaryProvider({
  children,
}: ErrorBoundaryProviderProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Global Error Boundary:', error, errorInfo);

    if (process.env.NODE_ENV === 'production') {
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary
      onError={handleError}
      onRetry={handleRetry}
      title="Error de la aplicación"
      message="Ha ocurrido un error inesperado en la aplicación. Por favor, intenta recargar la página."
      showErrorDetails={process.env.NODE_ENV === 'development'}
    >
      {children}
    </ErrorBoundary>
  );
}
