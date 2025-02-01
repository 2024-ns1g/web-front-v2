import { z } from "zod";

// =右矢印キーに近い挙動
export const presenterWsTriggerNextStepMessageSchema = z.object({
  requestType: z.literal('TRIGGER_NEXT_STEP'),
  data: z.object({
  })
});

export type presenterWsTriggerNextStepMessage = z.infer<typeof presenterWsTriggerNextStepMessageSchema>;
