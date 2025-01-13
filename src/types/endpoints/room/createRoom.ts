import z from 'zod';

export const createRoomRequestSchema = z.object({
  displayName: z.string(),
});

export const createRoomResponseSchema = z.object({
  roomId: z.string(),
  newToken: z.string(),
});

export type CreateRoomRequest = z.infer<typeof createRoomRequestSchema>;
export type CreateRoomResponse = z.infer<typeof createRoomResponseSchema>;
