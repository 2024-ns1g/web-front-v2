import { z } from "zod";

const PageBaseSchema = z.object({
  pageId: z.string(),
  timeRatio: z.number().optional().nullable(),
  title: z.string().optional().nullable(),
  isEnabled: z.boolean(),
});

export const PageSchema = PageBaseSchema;

export type Page = z.infer<typeof PageSchema>;
