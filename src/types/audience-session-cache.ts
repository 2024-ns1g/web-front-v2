import { z } from "zod";

// Define the schema for a single script
const ScriptSchema = z.object({
  content: z.string(),
  // isEnabled: z.boolean(), // コメントアウトを解除して有効にしてください
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

// Define the schema for a single vote in the state
const VoteSchema = z.object({
  voteId: z.string(),
  choiceId: z.string(),
  voterId: z.string(),
});

// Define the schema for the state
const StateSchema = z.object({
  currentPage: z.number(),
  avtiaveVoteId: z.string().nullable(),
  votes: z.array(VoteSchema),
});

// Combine all parts into the main SessionCache schema
export const SessionCacheSchema = z.object({
  sessionId: z.string(),
  slideId: z.string(),
  title: z.string(),
  pages: z.array(PageSchema),
  availableVotes: z.array(AvailableVoteSchema).nullable(),
  state: StateSchema,
});

// Optionally, you can export the inferred TypeScript type from the schema
export type SessionCache = z.infer<typeof SessionCacheSchema>;
