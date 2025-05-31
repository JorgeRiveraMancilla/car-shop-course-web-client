'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/libs/react-query';
import { setErrorNotifier } from '@/libs/error-handler';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // Configurar Sonner como notificador de errores
  useEffect(() => {
    setErrorNotifier({
      showError: (message: string, title?: string) => {
        toast.error(message, {
          description: title,
          duration: 5000, // 5 segundos
          action: {
            label: 'Cerrar',
            onClick: () => {},
          },
        });
      },
      showWarning: (message: string, title?: string) => {
        toast.warning(message, {
          description: title,
          duration: 4000, // 4 segundos
        });
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}
