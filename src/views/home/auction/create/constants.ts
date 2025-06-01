/**
 * Constantes para validaciones de subasta
 */
export const AUCTION_VALIDATION = {
  MAKE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  MODEL: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  COLOR: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
  },
  YEAR: {
    MIN: 1900,
    MAX: new Date().getFullYear() + 1,
  },
  MILEAGE: {
    MIN: 0,
    MAX: 1000000, // 1 millón de km
  },
  RESERVE_PRICE: {
    MIN: 1,
    MAX: 10000000, // 10 millones USD
  },
  MIN_AUCTION_DURATION_HOURS: 24,
} as const;

/**
 * Mensajes de error personalizados
 */
export const ERROR_MESSAGES = {
  MAKE: {
    REQUIRED: 'La marca es requerida',
    MIN_LENGTH: `La marca debe tener al menos ${AUCTION_VALIDATION.MAKE.MIN_LENGTH} caracteres`,
    MAX_LENGTH: `La marca no puede exceder ${AUCTION_VALIDATION.MAKE.MAX_LENGTH} caracteres`,
  },
  MODEL: {
    REQUIRED: 'El modelo es requerido',
    MIN_LENGTH: `El modelo debe tener al menos ${AUCTION_VALIDATION.MODEL.MIN_LENGTH} caracteres`,
    MAX_LENGTH: `El modelo no puede exceder ${AUCTION_VALIDATION.MODEL.MAX_LENGTH} caracteres`,
  },
  COLOR: {
    REQUIRED: 'El color es requerido',
    MIN_LENGTH: `El color debe tener al menos ${AUCTION_VALIDATION.COLOR.MIN_LENGTH} caracteres`,
    MAX_LENGTH: `El color no puede exceder ${AUCTION_VALIDATION.COLOR.MAX_LENGTH} caracteres`,
  },
  YEAR: {
    REQUIRED: 'El año es requerido',
    MIN: `El año debe ser mayor o igual a ${AUCTION_VALIDATION.YEAR.MIN}`,
    MAX: 'Año inválido',
  },
  MILEAGE: {
    REQUIRED: 'El kilometraje es requerido',
    MIN: 'El kilometraje no puede ser negativo',
    MAX: `El kilometraje no puede exceder ${AUCTION_VALIDATION.MILEAGE.MAX.toLocaleString()} km`,
  },
  RESERVE_PRICE: {
    REQUIRED: 'El precio de reserva es requerido',
    MIN: 'El precio de reserva debe ser mayor a 0',
    MAX: `El precio de reserva no puede exceder $${AUCTION_VALIDATION.RESERVE_PRICE.MAX.toLocaleString()}`,
  },
  IMAGE_URL: {
    REQUIRED: 'La URL de la imagen es requerida',
    INVALID: 'Debe ser una URL válida de imagen (jpg, jpeg, png, gif, webp)',
  },
  AUCTION_END: {
    REQUIRED: 'La fecha de término es requerida',
    MIN_DURATION: `La subasta debe tener una duración mínima de ${AUCTION_VALIDATION.MIN_AUCTION_DURATION_HOURS} horas`,
  },
} as const;

/**
 * Placeholders para los campos del formulario
 */
export const PLACEHOLDERS = {
  MAKE: 'Ej: Toyota, Ford, Chevrolet',
  MODEL: 'Ej: Corolla, Focus, Cruze',
  COLOR: 'Ej: Rojo, Azul, Blanco',
  YEAR: 'Año de fabricación',
  MILEAGE: 'Kilometraje actual',
  RESERVE_PRICE: 'Precio mínimo',
  IMAGE_URL: 'https://ejemplo.com/imagen.jpg',
} as const;

/**
 * Tooltips informativos
 */
export const TOOLTIPS = {
  MAKE: 'Ingresa la marca del vehículo (ej: Toyota, Ford, etc.)',
  MODEL: 'Ingresa el modelo específico del vehículo',
  COLOR: 'Color principal del vehículo',
  YEAR: 'Año de fabricación del vehículo (1900 - presente)',
  MILEAGE: 'Kilometraje actual del vehículo',
  RESERVE_PRICE:
    'Precio mínimo por el que estás dispuesto a vender el vehículo',
  IMAGE_URL:
    'URL de la imagen principal del vehículo (debe comenzar con http:// o https://)',
  AUCTION_END:
    'La subasta debe tener una duración mínima de 24 horas a partir de ahora',
} as const;

/**
 * Expresiones regulares para validaciones
 */
export const REGEX_PATTERNS = {
  IMAGE_URL: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
  URL: /^https?:\/\/.+/i,
} as const;

/**
 * Función helper para obtener la fecha mínima de término de subasta
 */
export const getMinAuctionEndDate = (): Date => {
  const now = new Date();
  const minEndDate = new Date(now);
  minEndDate.setHours(
    now.getHours() + AUCTION_VALIDATION.MIN_AUCTION_DURATION_HOURS
  );
  return minEndDate;
};

/**
 * Función helper para validar URL de imagen
 */
export const isValidImageUrl = (url: string): boolean => {
  return REGEX_PATTERNS.IMAGE_URL.test(url);
};

/**
 * Función helper para formatear precio
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Función helper para formatear kilometraje
 */
export const formatMileage = (mileage: number): string => {
  return `${mileage.toLocaleString()} km`;
};
