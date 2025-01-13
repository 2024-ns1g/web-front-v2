import { getRoomListResponseSchema } from "@/types/endpoints/room/getRoomList";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const getJoinedRoomList = async (apiClient: AxiosInstance, log: any) => {
  const response = await apiClient.get('/room');
  try {
    const parsed = getRoomListResponseSchema.parse(response.data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
