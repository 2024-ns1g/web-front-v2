import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().nonempty("ユーザー名は必須です"),
  password: z.string().nonempty("パスワードは必須です"),
});
