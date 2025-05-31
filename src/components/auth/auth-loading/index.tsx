'use client';

import { Loader2 } from 'lucide-react';

const AuthLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600">Verificando autenticación...</p>
    </div>
  </div>
);

export default AuthLoading;
