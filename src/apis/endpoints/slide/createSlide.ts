import { CreateSlideRequest, createSlideResponseSchema } from "@/types/endpoints/slide/createSlide";
import { AxiosInstance } from "axios";
import { z } from "zod";

export const createSlide = async (apiClient: AxiosInstance, log: any, params: CreateSlideRequest) => {
  const response = await apiClient.post('/room/create', params);
  try {
    const parsed = createSlideResponseSchema.parse(response.data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.error('Failed to parse response', error.errors);
    } else {
      log.error('Unknown error', error);
    }
  }
}
