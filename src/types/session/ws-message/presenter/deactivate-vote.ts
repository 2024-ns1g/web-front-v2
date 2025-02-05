import { z } from "zod";

export const presenterWsDeactivateVoteMessageSchema = z.object({
  requestType: z.literal('DEACTIVATE_VOTE'),
  data: z.object({
    voteId: z.string(),
  })
});

export type presenterWsDeactivateVoteMessage = z.infer<typeof presenterWsDeactivateVoteMessageSchema>;
