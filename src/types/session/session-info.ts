import { z } from "zod";

// Define the schema for a single script
export const ScriptSchema = z.object({
  content: z.string(),
});

// Define the schema for a single page
export const PageSchema = z.object({
  pageId: z.string(),
  title: z.string(),
  step: z.number(),
  scripts: z.array(ScriptSchema),
});

// Define the schema for a single choice
export const ChoiceSchema = z.object({
  choiceId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  backgroundColor: z.string().nullable(),
  borderColor: z.string().nullable(),
});

// Define the schema for a single available vote
export const AvailableVoteSchema = z.object({
  voteId: z.string(),
  title: z.string(),
  question: z.string(),
  choices: z.array(ChoiceSchema),
});

// Combine all parts into the main SessionCache schema
export const SessionInfoSchema = z.object({
  sessionId: z.string(),
  slideId: z.string(),
  title: z.string(),
  pages: z.array(PageSchema),
  availableVotes: z.array(AvailableVoteSchema).nullable(),
});

// Optionally, you can export the inferred TypeScript type from the schema
export type SessionInfo = z.infer<typeof SessionInfoSchema>;
