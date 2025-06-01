import { User, SignInInput, signInSchema } from '@/schemas';
import { PERMISSIONS } from '@/config/constants';

export class AuthService {
  /**
   * Obtiene los permisos básicos para un usuario autenticado
   */
  static getBasicPermissions(): string[] {
    return [
      PERMISSIONS.VIEW_AUCTIONS,
      PERMISSIONS.CREATE_AUCTION,
      PERMISSIONS.EDIT_OWN_AUCTION,
      PERMISSIONS.DELETE_OWN_AUCTION,
      PERMISSIONS.BID_ON_AUCTIONS,
    ];
  }

  /**
   * Verifica si un usuario tiene un permiso específico
   */
  static hasPermission(
    userPermissions: string[],
    requiredPermission: string
  ): boolean {
    if (!requiredPermission) return true;
    return userPermissions.includes(requiredPermission);
  }

  /**
   * Verifica si un usuario es propietario de un recurso
   */
  static isResourceOwner(user: User | null, resourceUserId?: string): boolean {
    if (!user || !resourceUserId) return false;
    return user.id === resourceUserId || user.username === resourceUserId;
  }

  /**
   * Determina si una ruta requiere autenticación
   */
  static isProtectedRoute(pathname: string): boolean {
    const protectedRoutes = [
      '/auction/create',
      '/auction/edit',
      '/profile',
      '/my-auctions',
      '/mis-subastas',
      '/dashboard',
      '/admin',
    ];

    return protectedRoutes.some(route => {
      const pattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${pattern}/?$`);
      return regex.test(pathname);
    });
  }

  /**
   * Construye URL de redirección segura
   */
  static buildRedirectUrl(baseUrl: string, callbackUrl?: string): string {
    if (!callbackUrl) return baseUrl;

    try {
      const url = new URL(callbackUrl);
      const baseUrlObj = new URL(baseUrl, url.origin);

      if (url.origin === baseUrlObj.origin) {
        return callbackUrl;
      }
    } catch {}

    return baseUrl;
  }

  /**
   * Valida datos de sign in
   */
  static validateSignInData(data: unknown): SignInInput {
    return signInSchema.parse(data);
  }
}
