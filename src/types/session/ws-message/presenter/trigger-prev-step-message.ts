import { z } from "zod";

// =左矢印キーに近い挙動
export const presenterWsTriggerPrevStepMessageSchema = z.object({
  requestType: z.literal('TRIGGER_PREV_STEP'),
  data: z.object({
  })
});

export type presenterWsTriggerPrevStepMessage = z.infer<typeof presenterWsTriggerPrevStepMessageSchema>;
