import { z } from "zod";

export const VoteSchema = z.object({
  voteId: z.string(),
  choiceId: z.string(),
  voterId: z.string(),
});

export type Vote = z.infer<typeof VoteSchema>;
