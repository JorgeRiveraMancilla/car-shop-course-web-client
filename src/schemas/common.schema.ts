import { z } from 'zod';

export const paginationSchema = z.object({
  pageNumber: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(12),
});

export const idSchema = z.string().uuid('ID debe ser un UUID válido');

export const urlSchema = z
  .string()
  .url('Debe ser una URL válida')
  .min(1, 'URL es requerida');

export const imageUrlSchema = z
  .string()
  .url('Debe ser una URL válida')
  .regex(
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
    'Debe ser una URL válida de imagen (jpg, jpeg, png, gif, webp)'
  );

export const dateSchema = z.date({
  required_error: 'Fecha es requerida',
  invalid_type_error: 'Fecha inválida',
});

export const futureDateSchema = dateSchema.refine(
  date => date > new Date(),
  'La fecha debe ser futura'
);

export type PaginationInput = z.infer<typeof paginationSchema>;
