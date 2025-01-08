import { useApiClient } from "@/contexts/api-client-context";
import { useLogger } from "@/hooks/use-logger";
import { z } from "zod";

const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const login = async (params: LoginRequest) => {
  const apiClient = useApiClient();
  const { log } = useLogger('api/login');

  const response = await apiClient.post('/auth/login', params);

  try {
    const parsed = loginRequestSchema.parse(response.data);

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log('Failed to parse response', error.errors, "ERROR");
    } else {
      log('Unknown error', error, "ERROR");
    }
  }
}
