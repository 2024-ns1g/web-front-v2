import { RoomSchema } from '@/types/object/room';
import z from 'zod';

export const getRoomListResponseSchema = z.object({
  rooms: z.array(
    RoomSchema,
  ),
});

export type GetRoomListResponse = z.infer<typeof getRoomListResponseSchema>;
