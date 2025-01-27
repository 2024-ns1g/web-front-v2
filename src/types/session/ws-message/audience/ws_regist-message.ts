import { z } from "zod";

export const audienceWsRegistMessageSchema = z.object({
  requestType: z.literal('REGIST_AUDIENCE'),
  data: z.object({
    token: z.string(),
  })
});

export type audienceWsRegistMessage = z.infer<typeof audienceWsRegistMessageSchema>;
