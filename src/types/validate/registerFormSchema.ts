import { z } from "zod";

export const registerFormSchema = z.object({
  username: z.string().nonempty("ユーザー名は必須です"),
  password: z.string().nonempty("パスワードは必須です"),
  passwordConfirmation: z.string().nonempty("パスワード（確認）は必須です"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "パスワードとパスワード（確認）が一致しません",
  path: ["passwordConfirmation"], // エラーを表示するフィールド
});
