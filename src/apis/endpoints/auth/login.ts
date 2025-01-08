import { AxiosInstance } from "axios";
import { z } from "zod";

const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const login = async (apiClient: AxiosInstance, log: any, params: LoginRequest) => {
  const response = await apiClient.post('/auth/login', params);

  try {
    const parsed = loginRequestSchema.parse(response.data);

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
