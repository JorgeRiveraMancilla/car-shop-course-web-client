'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsufficientPermissionsProps } from './types';

const InsufficientPermissions = ({
  message,
  onGoBack,
}: InsufficientPermissionsProps) => (
  <div className="flex items-center justify-center min-h-[400px] p-6">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
        <CardTitle className="text-xl">Permisos Insuficientes</CardTitle>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
      </CardHeader>
      <CardContent>
        <Button onClick={onGoBack} variant="outline" className="w-full">
          Volver Atrás
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default InsufficientPermissions;
