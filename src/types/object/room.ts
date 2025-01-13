import { z } from "zod";
import { SimpleUserSchema } from "./user";

const RoomBaseSchema = z.object({
  roomId: z.string(),
  displayName: z.string(),
  icon: z.string(),
  owner: SimpleUserSchema,
  createdAt: z.string(),
});

export const RoomSchema = RoomBaseSchema;
export type Room = z.infer<typeof RoomSchema>;

