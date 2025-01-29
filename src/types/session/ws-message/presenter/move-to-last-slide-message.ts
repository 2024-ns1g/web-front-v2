import { z } from "zod";

export const presenterWsMoveToLastSlideMessageSchema = z.object({
  requestType: z.literal('MOVE_TO_LAST_SLIDE'),
  data: z.object({
  })
});

export type presenterWsMoveToLastSlideMessage = z.infer<typeof presenterWsMoveToLastSlideMessageSchema>;
