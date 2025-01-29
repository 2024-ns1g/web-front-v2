import { z } from "zod";

// =左矢印キーに近い挙動
export const presenterWsTriggerPrevEventMessageSchema = z.object({
  requestType: z.literal('TRIGGER_PREV_EVENT'),
  data: z.object({
  })
});

export type presenterWsTriggerPrevEventMessage = z.infer<typeof presenterWsTriggerPrevEventMessageSchema>;
