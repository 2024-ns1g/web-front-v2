import { z } from "zod";

export const wsRegistMessageSchema = z.object({
  requestType: z.literal('REGIST_AUDIENCE'),
  data: z.object({
    token: z.string(),
  })
});

export type WsRegistMessage = z.infer<typeof wsRegistMessageSchema>;
