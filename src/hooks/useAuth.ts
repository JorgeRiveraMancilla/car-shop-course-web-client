'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { AuthService } from '@/services';
import { User } from '@/schemas';
import { Session } from 'next-auth';

interface UseAuthOptions {
  redirectTo?: string;
  onSignInSuccess?: () => void;
  onSignOutSuccess?: () => void;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
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

export const useAuth = (options: UseAuthOptions = {}): UseAuthReturn => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const authState = useMemo<AuthState>(
    () => ({
      isAuthenticated: status === 'authenticated' && !!session,
      isLoading: status === 'loading',
      user: (session?.user as User) || null,
      session: session || null,
    }),
    [session, status]
  );

  const handleSignIn = useCallback(
    async (signInOptions: { callbackUrl?: string } = {}) => {
      try {
        const callbackUrl = AuthService.buildRedirectUrl(
          options.redirectTo || window.location.href,
          signInOptions.callbackUrl
        );

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
  );

  const refresh = useCallback(async () => {
    try {
      await update();
    } catch (error) {
      throw error;
    }
  }, [update]);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!authState.isAuthenticated) return false;
      const userPermissions = AuthService.getBasicPermissions();
      return AuthService.hasPermission(userPermissions, permission);
    },
    [authState.isAuthenticated]
  );

  const isOwner = useCallback(
    (resourceUserId?: string): boolean => {
      return AuthService.isResourceOwner(authState.user, resourceUserId);
    },
    [authState.user]
  );

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
