'use client';

import { useEffect } from 'react';
import ErrorDisplay from '@/components/error-display';

interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error('App-level error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <ErrorDisplay
        title="Error de la aplicación"
        message={error.message || 'Ha ocurrido un error inesperado'}
        onRetry={reset}
        retryText="Intentar nuevamente"
      />
    </div>
  );
}
