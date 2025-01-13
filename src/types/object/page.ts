import { z } from "zod";

const PageBaseSchema = z.object({
  pageId: z.string(),
  timeRatio: z.number().optional().nullable(),
  title: z.string().optional().nullable(),
  isEnabled: z.boolean(),
});

export const PageSchema = PageBaseSchema;
export const PageListSchama = z.object({
  pages: z.array(PageBaseSchema),
});

export type Page = z.infer<typeof PageSchema>;
export type PageList = z.infer<typeof PageListSchama>;
