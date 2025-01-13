import { SlideSchema } from '@/types/object/slide';
import z from 'zod';

export const getSlideListResponseSchema = z.object({
  slides: z.array(
    SlideSchema,
  ),
});

export type GetSlideListResponse = z.infer<typeof getSlideListResponseSchema>;
