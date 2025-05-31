'use client';

import { Button } from '@/components/ui/button';
import { useParamsStore } from '@/hooks/useParamsStore';
import { RefreshCw } from 'lucide-react';

export default function EmptyState() {
  const reset = useParamsStore(state => state.reset);

  return (
    <div className="w-full bg-white rounded-lg border p-16">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-5">
          <svg
            className="h-16 w-16 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <path d="M3.3 7l8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>

        <h3 className="text-2xl font-medium text-gray-900 mb-3">
          No hay resultados
        </h3>

        <div className="text-center max-w-md mb-6 text-muted-foreground">
          <p>No encontramos subastas que coincidan con tu búsqueda.</p>
          <p>Prueba ajustando los filtros o realizando una nueva búsqueda.</p>
        </div>

        <Button
          onClick={reset}
          variant="default"
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
        >
          <RefreshCw className="h-4 w-4" />
          Restablecer filtros
        </Button>
      </div>
    </div>
  );
}
