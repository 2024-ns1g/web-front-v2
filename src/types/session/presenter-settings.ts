import { z } from "zod";

// ジェスチャーのラベルとキーの対応
export const GestureClassification = {
  Unknown: {
    key: 0,
    displayName: '不明',
  },
  Closed_Fist: {
    key: 1,
    displayName: '✊',
  },
  Open_Palm: {
    key: 2,
    displayName: '🖐️',
  },
  Pointing_Up: {
    key: 3,
    displayName: '☝️',
  },
  Thumbs_Down: {
    key: 4,
    displayName: '👎',
  },
  Thumbs_Up: {
    key: 5,
    displayName: '👍',
  },
  Victory: {
    key: 6,
    displayName: '✌️',
  },
  ILoveYou: {
    key: 7,
    displayName: '🤟',
  },
} as const;

export const PresenterSettingsSchema = z.object({
  threshold: z.number(),
  stableTime: z.number(),
  actionMap: z.record(z.object({
    gesture: z.union([
      z.literal(GestureClassification.Closed_Fist.key),
      z.literal(GestureClassification.Open_Palm.key),
      z.literal(GestureClassification.Pointing_Up.key),
      z.literal(GestureClassification.Thumbs_Down.key),
      z.literal(GestureClassification.Thumbs_Up.key),
      z.literal(GestureClassification.Victory.key),
      z.literal(GestureClassification.ILoveYou.key),
    ]),
    action: z.string(),
  })),
});

export type PresenterSettings = z.infer<typeof PresenterSettingsSchema>;

