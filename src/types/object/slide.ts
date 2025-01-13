import { z } from "zod";

const SlideBaseSchema = z.object({
  slideId: z.string(),
  displayName: z.string(),
  summary: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  isPublic: z.boolean(),
});

export const SlideSchema = SlideBaseSchema;

export type Slide = z.infer<typeof SlideSchema>;
