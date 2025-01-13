import { StateContextType } from "@/contexts/state-context";
import { getSlideListResponseSchema } from "@/types/endpoints/slide/getSlideList";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const getLinkedSlideList = async (apiClient: AxiosInstance, log: any, state: StateContextType, _params: null) => {
  if (!state.activeRoomId) {
    log.error('activeRoomId is not set');
    return;
  }
  const response = await apiClient.get(`/room/${state.activeRoomId}/slide`);
  try {
    const parsed = getSlideListResponseSchema.parse(response.data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
