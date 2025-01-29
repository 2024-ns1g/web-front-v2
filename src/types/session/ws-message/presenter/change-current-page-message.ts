import { z } from "zod";

// ダイレクトに指定したページに移動する(矢印キーでイベントをトリガーするわけではない)
export const presenterWsChangeCurrentPageMessageSchema = z.object({
  requestType: z.literal('CHANGE_CURRENT_PAGE'),
  data: z.object({
    newPageIndex: z.number(),
  })
});

export type presenterWsChangeCurrentPageMessage = z.infer<typeof presenterWsChangeCurrentPageMessageSchema>;
