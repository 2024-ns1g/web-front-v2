import { z } from "zod";

export const presenterWsMoveToFirstSlideMessageSchema = z.object({
  requestType: z.literal('MOVE_TO_FIRST_SLIDE'),
  data: z.object({
  })
});

export type presenterWsMoveToFirstSlideMessage = z.infer<typeof presenterWsMoveToFirstSlideMessageSchema>;
