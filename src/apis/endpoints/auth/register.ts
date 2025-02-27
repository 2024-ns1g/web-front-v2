import { StateContextType } from "@/contexts/state-context";
import { RegisterRequest, RegisterResponseSchema } from "@/types/endpoints/auth/register";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const register = async (apiClient: AxiosInstance, log: any, _state: StateContextType, params: RegisterRequest) => {
  const response = await apiClient.post('/auth/username/register', params);

  try {
    const parsed = RegisterResponseSchema.parse(response.data);

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
