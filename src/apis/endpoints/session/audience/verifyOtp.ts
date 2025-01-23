import { StateContextType } from "@/contexts/state-context";
import { VerifyOtpRequest, verifyOtpResponseSchema } from "@/types/endpoints/session/verifyOtpSchema";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const getJoinedRoomList = async (apiClient: AxiosInstance, log: any, _state: StateContextType, params: VerifyOtpRequest) => {
  const response = await apiClient.post('/session/audience/verify', params);

  try {
    const parsed = verifyOtpResponseSchema.parse(response.data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
};
