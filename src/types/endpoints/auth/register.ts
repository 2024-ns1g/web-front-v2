import z from 'zod';

export const RegisterResponseSchema = z.object({
  token: z.string(),
});

export const RegisterRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
