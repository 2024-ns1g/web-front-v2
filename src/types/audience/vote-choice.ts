import { z } from "zod";

export const VoteChoiceSchema = z.object({
  choiceId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  backgroundColor: z.string().nullable(),
  borderColor: z.string().nullable(),
});

export type VoteChoice = z.infer<typeof VoteChoiceSchema>;
