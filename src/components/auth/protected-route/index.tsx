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

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !showFallback) {
      const currentUrl =
        typeof window !== 'undefined' ? window.location.href : '/';
      const signInUrl = new URL(redirectTo, window.location.origin);
      signInUrl.searchParams.set('callbackUrl', currentUrl);
      router.replace(signInUrl.toString());
    }
  }, [isLoading, isAuthenticated, redirectTo, router, showFallback]);

  if (isLoading) {
    return fallback || <AuthLoading />;
  }

  if (!isAuthenticated) {
    if (!showFallback) {
      return null;
    }

    return (
      <AccessDenied
        message="Necesitas iniciar sesión para acceder a esta página."
        onSignIn={() => signIn()}
        onGoHome={() => router.push('/')}
      />
    );
  }

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

  return <>{children}</>;
};

export default ProtectedRoute;
