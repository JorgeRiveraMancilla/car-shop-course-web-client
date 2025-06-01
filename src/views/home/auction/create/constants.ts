// src/views/home/auction/create/constants.ts
export const FORM_VALIDATION_RULES = {
  MAKE: {
    required: 'La marca es requerida',
    minLength: {
      value: 2,
      message: 'La marca debe tener al menos 2 caracteres',
    },
    maxLength: {
      value: 50,
      message: 'La marca no puede exceder 50 caracteres',
    },
  },
  MODEL: {
    required: 'El modelo es requerido',
    minLength: {
      value: 2,
      message: 'El modelo debe tener al menos 2 caracteres',
    },
    maxLength: {
      value: 50,
      message: 'El modelo no puede exceder 50 caracteres',
    },
  },
  YEAR: {
    required: 'El año es requerido',
    min: { value: 1900, message: 'El año debe ser mayor o igual a 1900' },
    max: { value: new Date().getFullYear() + 1, message: 'Año inválido' },
  },
  COLOR: {
    required: 'El color es requerido',
    minLength: {
      value: 3,
      message: 'El color debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 30,
      message: 'El color no puede exceder 30 caracteres',
    },
  },
  MILEAGE: {
    required: 'El kilometraje es requerido',
    min: { value: 0, message: 'El kilometraje no puede ser negativo' },
    max: {
      value: 1000000,
      message: 'El kilometraje excede el límite permitido',
    },
  },
  RESERVE_PRICE: {
    required: 'El precio de reserva es requerido',
    min: { value: 1, message: 'El precio de reserva debe ser mayor a 0' },
    max: { value: 10000000, message: 'El precio de reserva excede el límite' },
  },
  IMAGE_URL: {
    required: 'La URL de la imagen es requerida',
    pattern: {
      value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
      message: 'Debe ser una URL válida de imagen (jpg, jpeg, png, gif, webp)',
    },
  },
  AUCTION_END: {
    required: 'La fecha de término es requerida',
  },
} as const;

export const FORM_PLACEHOLDERS = {
  MAKE: 'Ej: Toyota, Ford, Chevrolet',
  MODEL: 'Ej: Corolla, Focus, Cruze',
  COLOR: 'Ej: Rojo, Azul, Blanco',
  YEAR: 'Año de fabricación',
  MILEAGE: 'Kilometraje actual',
  RESERVE_PRICE: 'Precio mínimo',
  IMAGE_URL: 'https://ejemplo.com/imagen.jpg',
} as const;

export const FORM_TOOLTIPS = {
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
