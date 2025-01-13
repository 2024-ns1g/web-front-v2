import z from 'zod';

export const createRoomRequestSchema = z.object({
  displayName: z.string(),
});

export const createRoomResponseSchema = z.object({
  roomId: z.string(),
  newToken: z.string(),
});

