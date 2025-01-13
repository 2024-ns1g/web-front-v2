import { z } from "zod";

const SlideBaseSchema = z.object({
  slideId: z.string(),
  displayName: z.string(),
  summary: z.string(),
  thumbnail: z.string(),
  isPublic: z.boolean(),
});

export const SlideSchema = SlideBaseSchema;
export const SlideListSchema = z.object({
  slides: z.array(SlideBaseSchema),
});

export type Slide = z.infer<typeof SlideSchema>;
export type SlideList = z.infer<typeof SlideListSchema>;
