import { z } from "zod";

// =右矢印キーに近い挙動
export const presenterWsTriggerNextEventMessageSchema = z.object({
  requestType: z.literal('TRIGGER_NEXT_EVENT'),
  data: z.object({
  })
});

export type presenterWsTriggerNextEventMessage = z.infer<typeof presenterWsTriggerNextEventMessageSchema>;
