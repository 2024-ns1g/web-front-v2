import z from 'zod';

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
