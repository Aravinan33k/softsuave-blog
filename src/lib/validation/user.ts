import { z } from 'zod';

const password = z.string().min(8, 'Password must be at least 8 characters').max(200);

export const userCreateSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  name: z.string().trim().max(120).optional(),
  role: z.enum(['ADMIN', 'EDITOR']),
  password,
});

export const userUpdateSchema = z.object({
  name: z.string().trim().max(120).nullish(),
  role: z.enum(['ADMIN', 'EDITOR']).optional(),
  password: password.optional(),
});
