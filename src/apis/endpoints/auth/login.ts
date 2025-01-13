import { LoginResponseSchema, LoginRequest } from "@/types/endpoints/auth/login";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const login = async (apiClient: AxiosInstance, log: any, params: LoginRequest) => {
  const response = await apiClient.post('/auth/username/login', params);

  try {
    const parsed = LoginResponseSchema.parse(response.data);

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
