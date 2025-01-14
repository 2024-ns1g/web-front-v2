import { z } from "zod";

export const createSlideFormSchema = z.object({
  displayName: z.string().nonempty("ルーム名は必須です"),
  summary: z.string().optional().nullable(),
});
