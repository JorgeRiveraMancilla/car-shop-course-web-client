'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Session } from 'next-auth';

interface UseAuthOptions {
  redirectTo?: string;
  onSignInSuccess?: () => void;
  onSignOutSuccess?: () => void;
}

interface AuthUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  session: Session | null;
}

interface UseAuthReturn extends AuthState {
  signIn: (options?: { callbackUrl?: string }) => Promise<void>;
  signOut: (options?: { callbackUrl?: string }) => Promise<void>;
  refresh: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isOwner: (resourceUserId?: string) => boolean;
  getAccessToken: () => string | null;
}

/**
 * Hook personalizado para manejar autenticación
 * Integrado con tu configuración existente de NextAuth
 */
export const useAuth = (options: UseAuthOptions = {}): UseAuthReturn => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Estado derivado manteniendo consistencia con tus tipos
  const authState = useMemo<AuthState>(
    () => ({
      isAuthenticated: status === 'authenticated' && !!session,
      isLoading: status === 'loading',
      user: (session?.user as AuthUser) || null,
      session: session || null,
    }),
    [session, status]
  );

  // Función para iniciar sesión usando tu configuración existente
  const handleSignIn = useCallback(
    async (signInOptions: { callbackUrl?: string } = {}) => {
      try {
        const callbackUrl =
          signInOptions.callbackUrl ||
          options.redirectTo ||
          window.location.href;

        const result = await signIn('id-server', {
          callbackUrl,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        if (result?.ok) {
          options.onSignInSuccess?.();

          if (result.url) {
            window.location.href = result.url;
          }
        }
      } catch (error) {
        throw error;
      }
    },
    [options]
  );

  // Función para cerrar sesión
  const handleSignOut = useCallback(
    async (signOutOptions: { callbackUrl?: string } = {}) => {
      try {
        const callbackUrl = signOutOptions.callbackUrl || '/';

        await signOut({
          callbackUrl,
          redirect: false,
        });

        options.onSignOutSuccess?.();

        router.push(callbackUrl);
      } catch (error) {
        throw error;
      }
    },
    [options, router]
  ); // Removido router de las dependencias

  // Función para refrescar la sesión
  const refresh = useCallback(async () => {
    try {
      await update();
    } catch (error) {
      throw error;
    }
  }, [update]);

  // Verificar permisos (expandible para tu sistema de roles)
  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!authState.isAuthenticated) return false;

      // Por ahora, cualquier usuario autenticado tiene permisos básicos
      // Puedes expandir esto basado en roles desde tu Identity Server
      const basicPermissions = [
        'create_auction',
        'view_auctions',
        'edit_own_auction',
      ];
      return basicPermissions.includes(permission);
    },
    [authState.isAuthenticated]
  );

  // Verificar si el usuario es propietario de un recurso
  const isOwner = useCallback(
    (resourceUserId?: string): boolean => {
      if (!authState.isAuthenticated || !resourceUserId) {
        return false;
      }

      return (
        authState.user?.id === resourceUserId ||
        authState.user?.username === resourceUserId
      );
    },
    [authState.isAuthenticated, authState.user]
  );

  // Obtener token de acceso
  const getAccessToken = useCallback((): string | null => {
    return session?.accessToken || null;
  }, [session]);

  return {
    ...authState,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refresh,
    hasPermission,
    isOwner,
    getAccessToken,
  };
};

/**
 * Hook para verificar autenticación y redirigir si es necesario
 */
export const useRequireAuth = (redirectTo: string = '/auth/sign-in') => {
  const auth = useAuth();
  const router = useRouter();

  // Redirigir si no está autenticado
  if (!auth.isLoading && !auth.isAuthenticated) {
    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : '/';
    const signInUrl = new URL(redirectTo, window.location.origin);
    signInUrl.searchParams.set('callbackUrl', currentUrl);

    router.replace(signInUrl.toString());
  }

  return auth;
};

/**
 * Hook para obtener el token de acceso
 */
export const useAccessToken = (): string | null => {
  const { getAccessToken } = useAuth();
  return getAccessToken();
};
