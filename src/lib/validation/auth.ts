import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(1).max(200),
  // Optional TOTP code, required only when the account has 2FA enabled.
  totp: z.string().trim().min(6).max(8).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
