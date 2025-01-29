import { z } from "zod";

export const presenterWsTriggerPrevEventMessageSchema = z.object({
  requestType: z.literal('TRIGGER_PREV_EVENT'),
  data: z.object({
  })
});

export type presenterWsTriggerPrevEventMessage = z.infer<typeof presenterWsTriggerPrevEventMessageSchema>;
