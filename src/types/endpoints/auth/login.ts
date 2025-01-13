import zod from 'zod';

export const LoginResponseSchema = zod.object({
  token: zod.string(),
});

export type LoginResponse = zod.infer<typeof LoginResponseSchema>;
