import { useApiClient } from "@/contexts/api-client-context";
import { useLogger } from "@/hooks/use-logger";
import { z } from "zod";

const registerRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const register = async (params: RegisterRequest) => {
  const apiClient = useApiClient();
  const log = useLogger('api/register');

  const response = await apiClient.post('/auth/register', params);

  try {
    const parsed = registerRequestSchema.parse(response.data);

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
