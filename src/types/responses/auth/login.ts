import zod from 'zod';

export const LoginResponseSchema = zod.object({
  token: zod.string(),
});
