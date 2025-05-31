'use client';

import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessDeniedProps } from './types';

const AccessDenied = ({ message, onSignIn, onGoHome }: AccessDeniedProps) => (
  <div className="flex items-center justify-center min-h-[400px] p-6">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <Lock className="h-6 w-6 text-red-600" />
        </div>
        <CardTitle className="text-xl">Acceso Restringido</CardTitle>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={onSignIn} className="w-full">
          Iniciar Sesión
        </Button>
        <Button onClick={onGoHome} variant="outline" className="w-full">
          Volver al Inicio
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default AccessDenied;
