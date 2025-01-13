import { PageSchema } from '@/types/object/page';
import z from 'zod';

export const getPageListResponseSchema = z.object({
  pages: z.array(
    PageSchema,
  ),
});

export type GetPageListResponse = z.infer<typeof getPageListResponseSchema>;
