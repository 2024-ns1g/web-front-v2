import { z } from "zod";

export const presenterWsActivateVoteMessageSchema = z.object({
  requestType: z.literal('ACTIVATE_VOTE'),
  data: z.object({
    voteId: z.string(),
  })
});

export type presenterWsActivateVoteMessage = z.infer<typeof presenterWsActivateVoteMessageSchema>;
