import z from 'zod';

export const createSlideRequestSchema = z.object({
  displayName: z.string(),
  summary: z.string().nullable().optional(),
});

export const createSlideResponseSchema = z.object({
  slideId: z.string(),
});

export type CreateSlideRequest = z.infer<typeof createSlideRequestSchema>;
export type CreateSlideResponse = z.infer<typeof createSlideResponseSchema>;
