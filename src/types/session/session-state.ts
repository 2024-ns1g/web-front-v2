import { z } from "zod";
import { VoteSchema } from "./vote";

export const SessionStateSchema = z.object({
  currentPage: z.number(),
  activeVoteIds: z.array(z.string()),
  votes: z.array(VoteSchema),
});

export type SessionState = z.infer<typeof SessionStateSchema>;
