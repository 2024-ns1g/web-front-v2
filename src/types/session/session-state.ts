import { z } from "zod";

export const SessionStateSchema = z.object({
  currentPage: z.number(),
  activeVoteIds: z.array(z.string()),
});

export type SessionState = z.infer<typeof SessionStateSchema>;
