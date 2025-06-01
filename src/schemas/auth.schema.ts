import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  image: z.string().url().nullable(),
  username: z.string(),
});

export const sessionSchema = z.object({
  user: userSchema,
  accessToken: z.string().optional(),
  expires: z.string(),
});

export const signInSchema = z.object({
  callbackUrl: z.string().url().optional(),
  redirect: z.boolean().default(true),
});

export type User = z.infer<typeof userSchema>;
export type AuthSession = z.infer<typeof sessionSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
