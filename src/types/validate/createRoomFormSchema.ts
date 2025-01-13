import { z } from "zod";

export const createRoomFormSchema = z.object({
  displayName: z.string().nonempty("ルーム名は必須です"),
});
