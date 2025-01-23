import { z } from "zod";

// Define the schema for a single script
const ScriptSchema = z.object({
  content: z.string(),
});

// Define the schema for a single page
const PageSchema = z.object({
  pageId: z.string(),
  title: z.string(),
  scripts: z.array(ScriptSchema),
});

// Define the schema for a single choice
const ChoiceSchema = z.object({
  choiceId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  color: z.string().nullable(),
});

// Define the schema for a single available vote
const AvailableVoteSchema = z.object({
  voteId: z.string(),
  title: z.string(),
  description: z.string(),
  choices: z.array(ChoiceSchema),
});

// Combine all parts into the main SessionCache schema
export const SessionCacheSchema = z.object({
  sessionId: z.string(),
  slideId: z.string(),
  title: z.string(),
  pages: z.array(PageSchema),
  availableVotes: z.array(AvailableVoteSchema).nullable(),
});

// Optionally, you can export the inferred TypeScript type from the schema
export type SessionCache = z.infer<typeof SessionCacheSchema>;
