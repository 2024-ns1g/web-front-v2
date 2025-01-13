import zod from 'zod';

export const RegisterResponseSchema = zod.object({
  token: zod.string(),
});

export type RegisterRequest = zod.infer<typeof RegisterResponseSchema>;

