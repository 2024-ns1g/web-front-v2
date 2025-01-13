import { CreateRoomRequest, createRoomResponseSchema } from "@/types/endpoints/room/createRoom";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const createRoom = async (apiClient: AxiosInstance, log: any, params: CreateRoomRequest) => {
  const response = await apiClient.post('/room/create', params);
  try {
    const parsed = createRoomResponseSchema.parse(response.data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
