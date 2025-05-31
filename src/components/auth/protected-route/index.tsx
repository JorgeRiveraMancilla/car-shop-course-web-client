'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthLoading from '../auth-loading';
import AccessDenied from '../access-denied';
import InsufficientPermissions from '../insufficient-permissions';
import { ProtectedRouteProps } from './types';

const ProtectedRoute = ({
  children,
  fallback,
  redirectTo = '/auth/sign-in',
  requiredPermissions = [],
  allowedUsers = [],
  requireOwnership,
  showFallback = true,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, signIn, hasPermission, isOwner } =
    useAuth();

  // Efectos para redirección
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !showFallback) {
      const currentUrl =
        typeof window !== 'undefined' ? window.location.href : '/';
      const signInUrl = new URL(redirectTo, window.location.origin);
      signInUrl.searchParams.set('callbackUrl', currentUrl);
      router.replace(signInUrl.toString());
    }
  }, [isLoading, isAuthenticated, redirectTo, router, showFallback]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return fallback || <AuthLoading />;
  }

  // Si no está autenticado
  if (!isAuthenticated) {
    if (!showFallback) {
      return null; // El useEffect manejará la redirección
    }

    return (
      <AccessDenied
        message="Necesitas iniciar sesión para acceder a esta página."
        onSignIn={() => signIn()}
        onGoHome={() => router.push('/')}
      />
    );
  }

  // Verificar permisos requeridos
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some(permission =>
      hasPermission(permission)
    );
    if (!hasRequiredPermission) {
      return (
        <InsufficientPermissions
          message="No tienes los permisos necesarios para acceder a esta página."
          onGoBack={() => router.back()}
        />
      );
    }
  }

  // Verificar usuarios permitidos
  if (allowedUsers.length > 0) {
    const isAllowedUser =
      allowedUsers.includes(user?.username || '') ||
      allowedUsers.includes(user?.id || '');
    if (!isAllowedUser) {
      return (
        <InsufficientPermissions
          message="No tienes autorización para acceder a esta página."
          onGoBack={() => router.back()}
        />
      );
    }
  }

  // Verificar propiedad del recurso
  if (requireOwnership) {
    const { resourceUserId, fallbackMessage } = requireOwnership;
    if (!isOwner(resourceUserId)) {
      return (
        <InsufficientPermissions
          message={
            fallbackMessage || 'Solo puedes acceder a tus propios recursos.'
          }
          onGoBack={() => router.back()}
        />
      );
    }
  }

  // Si todas las verificaciones pasan, renderizar los children
  return <>{children}</>;
};

export default ProtectedRoute;
