export const APP_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  IDENTITY_SERVER_URL: process.env.ID_SERVER_ISSUER,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    PAGE_SIZE_OPTIONS: [4, 8, 12, 16],
  },
  AUCTION: {
    MIN_DURATION_HOURS: 24,
    MAX_IMAGES: 10,
    SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
} as const;

export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    SIGN_OUT: '/auth/sign-out',
    ERROR: '/auth/error',
  },
  AUCTION: {
    LIST: '/auction',
    CREATE: '/auction/create',
    DETAILS: (id: string) => `/auction/${id}`,
    EDIT: (id: string) => `/auction/${id}/edit`,
  },
  USER: {
    PROFILE: '/profile',
    MY_AUCTIONS: '/mis-subastas',
  },
} as const;

export const PERMISSIONS = {
  CREATE_AUCTION: 'create_auction',
  EDIT_OWN_AUCTION: 'edit_own_auction',
  DELETE_OWN_AUCTION: 'delete_own_auction',
  VIEW_AUCTIONS: 'view_auctions',
  BID_ON_AUCTIONS: 'bid_on_auctions',
  ADMIN_PANEL: 'admin_panel',
  MODERATE_AUCTIONS: 'moderate_auctions',
} as const;
