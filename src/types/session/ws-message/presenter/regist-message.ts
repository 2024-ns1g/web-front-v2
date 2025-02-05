import { z } from "zod";

export const presenterWsRegistMessageSchema = z.object({
  requestType: z.literal('REGIST_PRESENTER'),
  data: z.object({
    token: z.string(),
  })
});

export type presenterWsRegistMessage = z.infer<typeof presenterWsRegistMessageSchema>;
