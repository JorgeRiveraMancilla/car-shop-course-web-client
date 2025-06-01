import { ZodSchema, ZodError } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export class ValidationService {
  /**
   * Valida datos usando un schema de Zod
   */
  static validate<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
    try {
      const validatedData = schema.parse(data);
      return {
        success: true,
        data: validatedData,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        return {
          success: false,
          errors,
        };
      }

      return {
        success: false,
        errors: { general: 'Error de validación desconocido' },
      };
    }
  }

  /**
   * Valida múltiples campos de forma segura
   */
  static validateSafe<T>(schema: ZodSchema<T>, data: unknown): T | null {
    try {
      return schema.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Transforma errores de Zod a formato amigable
   */
  static formatZodErrors(error: ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};

    error.errors.forEach(err => {
      const field = err.path.join('.');
      formatted[field] = err.message;
    });

    return formatted;
  }
}
