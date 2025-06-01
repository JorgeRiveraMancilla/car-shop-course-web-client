import { z } from 'zod';
import { imageUrlSchema, futureDateSchema } from './common.schema';

const CURRENT_YEAR = new Date().getFullYear();

export const auctionValidationRules = {
  make: { min: 2, max: 50 },
  model: { min: 2, max: 50 },
  color: { min: 3, max: 30 },
  year: { min: 1900, max: CURRENT_YEAR + 1 },
  mileage: { min: 0, max: 1000000 },
  reservePrice: { min: 1, max: 10000000 },
} as const;

export const baseAuctionSchema = z.object({
  make: z
    .string()
    .min(
      auctionValidationRules.make.min,
      'Marca debe tener al menos 2 caracteres'
    )
    .max(
      auctionValidationRules.make.max,
      'Marca no puede exceder 50 caracteres'
    )
    .trim(),

  model: z
    .string()
    .min(
      auctionValidationRules.model.min,
      'Modelo debe tener al menos 2 caracteres'
    )
    .max(
      auctionValidationRules.model.max,
      'Modelo no puede exceder 50 caracteres'
    )
    .trim(),

  year: z
    .number()
    .int('Año debe ser un número entero')
    .min(auctionValidationRules.year.min, 'Año debe ser mayor o igual a 1900')
    .max(auctionValidationRules.year.max, 'Año inválido'),

  color: z
    .string()
    .min(
      auctionValidationRules.color.min,
      'Color debe tener al menos 3 caracteres'
    )
    .max(
      auctionValidationRules.color.max,
      'Color no puede exceder 30 caracteres'
    )
    .trim(),

  mileage: z
    .number()
    .int('Kilometraje debe ser un número entero')
    .min(
      auctionValidationRules.mileage.min,
      'Kilometraje no puede ser negativo'
    )
    .max(
      auctionValidationRules.mileage.max,
      'Kilometraje excede el límite permitido'
    ),

  imageUrl: imageUrlSchema,
});

export const createAuctionSchema = baseAuctionSchema.extend({
  reservePrice: z
    .number()
    .int('Precio debe ser un número entero')
    .min(
      auctionValidationRules.reservePrice.min,
      'Precio de reserva debe ser mayor a 0'
    )
    .max(
      auctionValidationRules.reservePrice.max,
      'Precio de reserva excede el límite'
    ),

  auctionEnd: futureDateSchema.refine(date => {
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + 24);
    return date >= minDate;
  }, 'La subasta debe tener una duración mínima de 24 horas'),
});

export const auctionFormSchema = z.object({
  make: z.string().min(1, 'Marca es requerida'),
  model: z.string().min(1, 'Modelo es requerido'),
  year: z.string().min(1, 'Año es requerido'),
  color: z.string().min(1, 'Color es requerido'),
  mileage: z.string().min(1, 'Kilometraje es requerido'),
  imageUrl: z.string().min(1, 'URL de imagen es requerida'),
  reservePrice: z.string().min(1, 'Precio de reserva es requerido'),
  auctionEnd: z.date(),
});

export const updateAuctionSchema = baseAuctionSchema.partial();

export const auctionSchema = baseAuctionSchema.extend({
  id: z.string(),
  reservePrice: z.number(),
  seller: z.string(),
  winner: z.string().optional(),
  soldAmount: z.number().optional(),
  currentHighBid: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  auctionEnd: z.date(),
  status: z.string(),
});

export const searchParamsSchema = z.object({
  searchTerm: z.string().optional(),
  pageSize: z.number().int().min(1).max(100),
  pageNumber: z.number().int().min(1),
  seller: z.string().optional(),
  winner: z.string().optional(),
  orderBy: z.string(),
  filterBy: z.string(),
});

export const storeParamsRawSchema = z.object({
  searchTerm: z.string().optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
  pageNumber: z.number().int().min(1).optional(),
  seller: z.string().optional(),
  winner: z.string().optional(),
  orderBy: z.string().optional(),
  filterBy: z.string().optional(),
});

export const storeParamsSchema = z.object({
  searchTerm: z.string().optional(),
  pageSize: z.number().int().min(1).max(100).default(12),
  pageNumber: z.number().int().min(1).default(1),
  seller: z.string().optional(),
  winner: z.string().optional(),
  orderBy: z.string().default('make'),
  filterBy: z.string().default('live'),
});

export const searchFormSchema = z.object({
  searchTerm: z.string().optional(),
  pageSize: z.number().int().min(1).max(100),
  pageNumber: z.number().int().min(1),
  seller: z.string().optional(),
  winner: z.string().optional(),
  orderBy: z.string(),
  filterBy: z.string(),
});

export type CreateAuctionInput = z.infer<typeof createAuctionSchema>;
export type UpdateAuctionInput = z.infer<typeof updateAuctionSchema>;
export type AuctionFormInput = z.infer<typeof auctionFormSchema>;
export type Auction = z.infer<typeof auctionSchema>;
export type SearchParams = z.infer<typeof searchParamsSchema>;
export type StoreParams = z.infer<typeof storeParamsSchema>;
export type StoreParamsRaw = z.infer<typeof storeParamsRawSchema>;
export type SearchFormParams = z.infer<typeof searchFormSchema>;
