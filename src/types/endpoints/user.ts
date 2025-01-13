import zod from 'zod';

export const GetUsersResponseSchema = zod.object({
  internalId: zod.string(),
  username: zod.string(),
  displayName: zod.string(),
});

export const PutUsersUserIdResponseSchema = zod.object({
});

export type GetUsersResponse = zod.infer<typeof GetUsersResponseSchema>;
export type PutUsersUserIdResponse = zod.infer<typeof PutUsersUserIdResponseSchema>;

