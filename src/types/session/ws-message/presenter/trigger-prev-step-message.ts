import { custom, z } from "zod";

// =左矢印キーに近い挙動
export const presenterWsTriggerPrevStepMessageSchema = z.object({
  requestType: z.literal('TRIGGER_PREV_STEP'),
  data: z.object({
    currentPageIndex: z.number(),
    currentStepIndex: z.number(),
  })
});

export type presenterWsTriggerPrevStepMessage = z.infer<typeof presenterWsTriggerPrevStepMessageSchema>;
