import { ApiClient, Logger } from "@/types"; // `apiClient` と `log` の型を定義
import { LoginResponse, LoginResponseSchema } from "@/types/responses/auth/login";
import { z } from "zod";

const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const login = async (
  apiClient: ApiClient,
  log: Logger,
  params: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", params);

  try {
    const parsed = LoginResponseSchema.parse(response.data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error("Failed to parse response", error.errors);
    } else {
      log.error("Unknown error", error);
    }
    throw error;
  }
};
