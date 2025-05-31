/**
 * Configuración central de autenticación y rutas
 * Adaptada a tu estructura de proyecto existente
 */

// Rutas que requieren autenticación
export const PROTECTED_ROUTES = [
  '/auction/create',
  '/auction/edit',
  '/auction/[id]/edit',
  '/profile',
  '/profile/edit',
  '/my-auctions',
  '/mis-subastas',
  '/dashboard',
  '/settings',
  '/admin',
] as const;

// Rutas que solo usuarios no autenticados pueden acceder
export const AUTH_ROUTES = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/auth/error',
  '/auth/sign-out',
] as const;

// Rutas públicas
export const PUBLIC_ROUTES = [
  '/',
  '/auction',
  '/auction/[id]',
  '/search',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/help',
] as const;

// Permisos básicos del sistema
export const PERMISSIONS = {
  CREATE_AUCTION: 'create_auction',
  EDIT_OWN_AUCTION: 'edit_own_auction',
  DELETE_OWN_AUCTION: 'delete_own_auction',
  VIEW_AUCTIONS: 'view_auctions',
  BID_ON_AUCTIONS: 'bid_on_auctions',
  ADMIN_PANEL: 'admin_panel',
  MODERATE_AUCTIONS: 'moderate_auctions',
} as const;

// Configuraciones por página
export const PAGE_AUTH_CONFIG = {
  '/auction/create': {
    requireAuth: true,
    requiredPermissions: [PERMISSIONS.CREATE_AUCTION],
    redirectTo: '/auth/sign-in',
    fallbackMessage: 'Necesitas iniciar sesión para crear una subasta.',
  },
  '/profile/edit': {
    requireAuth: true,
    requireOwnership: true,
    redirectTo: '/auth/sign-in',
    fallbackMessage: 'Solo puedes editar tu propio perfil.',
  },
  '/admin': {
    requireAuth: true,
    requiredPermissions: [PERMISSIONS.ADMIN_PANEL],
    redirectTo: '/auth/sign-in',
    fallbackMessage: 'Solo administradores pueden acceder a esta página.',
  },
} as const;

// Mensajes de error personalizados
export const AUTH_MESSAGES = {
  UNAUTHORIZED: 'Necesitas iniciar sesión para acceder a esta página.',
  INSUFFICIENT_PERMISSIONS:
    'No tienes los permisos necesarios para acceder a esta página.',
  OWNERSHIP_REQUIRED: 'Solo puedes acceder a tus propios recursos.',
  PERMISSION_REQUIRED: (permissions: string[]) =>
    `Esta página requiere uno de los siguientes permisos: ${permissions.join(', ')}.`,
  SESSION_EXPIRED:
    'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  LOGIN_REQUIRED: 'Debes iniciar sesión para realizar esta acción.',
} as const;

// URLs de redirección por defecto
export const DEFAULT_REDIRECTS = {
  AFTER_SIGN_IN: '/',
  AFTER_SIGN_OUT: '/',
  UNAUTHORIZED: '/auth/sign-in',
  FORBIDDEN: '/',
  ERROR: '/auth/error',
} as const;

/**
 * Helpers para verificar tipos de rutas
 */
export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(route => {
    const pattern = route.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${pattern}/?$`);
    return regex.test(pathname);
  });
};

export const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.some(route => pathname.startsWith(route));
};

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => {
    if (route === '/') return pathname === '/';
    const pattern = route.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${pattern}/?$`);
    return regex.test(pathname);
  });
};

/**
 * Obtener configuración de autenticación para una página
 */
export const getPageAuthConfig = (pathname: string) => {
  // Buscar configuración exacta
  const exactConfig =
    PAGE_AUTH_CONFIG[pathname as keyof typeof PAGE_AUTH_CONFIG];
  if (exactConfig) return exactConfig;

  // Buscar configuración por patrón
  for (const [pattern, config] of Object.entries(PAGE_AUTH_CONFIG)) {
    const regex = new RegExp(`^${pattern.replace(/\[.*?\]/g, '[^/]+')}/?$`);
    if (regex.test(pathname)) {
      return config;
    }
  }

  // Configuración por defecto
  if (isProtectedRoute(pathname)) {
    return {
      requireAuth: true,
      redirectTo: DEFAULT_REDIRECTS.UNAUTHORIZED,
    };
  }

  return null;
};

/**
 * Verificar si un usuario tiene permiso específico
 * Por ahora es básico, pero se puede expandir con roles del Identity Server
 */
export const hasPermission = (
  userPermissions: string[],
  requiredPermission: string
): boolean => {
  // Si no hay permisos requeridos, permitir acceso
  if (!requiredPermission) return true;

  // Verificar si el usuario tiene el permiso específico
  return userPermissions.includes(requiredPermission);
};

/**
 * Obtener permisos básicos para un usuario autenticado
 * Esto se puede expandir basado en roles del Identity Server
 */
export const getBasicPermissions = (): string[] => {
  return [
    PERMISSIONS.VIEW_AUCTIONS,
    PERMISSIONS.CREATE_AUCTION,
    PERMISSIONS.EDIT_OWN_AUCTION,
    PERMISSIONS.DELETE_OWN_AUCTION,
    PERMISSIONS.BID_ON_AUCTIONS,
  ];
};

/**
 * Configuración para Duende Identity Server
 */
export const IDENTITY_SERVER_CONFIG = {
  PROVIDER_ID: 'id-server',
  CLIENT_ID: 'nextApp',
  SCOPES: 'openid profile auctionApp',
  PROMPT: 'login',
} as const;
