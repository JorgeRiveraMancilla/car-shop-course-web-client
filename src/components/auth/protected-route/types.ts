import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
  requiredPermissions?: string[];
  allowedUsers?: string[];
  requireOwnership?: {
    resourceUserId?: string;
    fallbackMessage?: string;
  };
  showFallback?: boolean;
}
