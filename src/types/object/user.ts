import { z } from "zod";

const UserBaseSchema = z.object({
  internalId: z.string(),
  username: z.string(),
  displayName: z.string(),
});

export const UserSchema = UserBaseSchema;

export const SimpleUserSchema = z.object({
  userId: z.string(), // = internalId
  displayName: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type SimpleUser = z.infer<typeof SimpleUserSchema>;
