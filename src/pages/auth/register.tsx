import { RegisterRequest } from "@/apis/endpoints/auth/register"; // 登録用のリクエスト型をインポート
import { useApis } from "@/contexts/api-context";
import { registerFormSchema } from "@/types/validate/registerFormSchema"; // 登録用のバリデーションスキーマ
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { toast } from "react-toastify";
import { useLogger } from "@/hooks/use-logger";
import { AuthLayout } from "@/layouts/authLayout";
import { useAuth } from "@/contexts/auth-context";
import { RegisterResponseSchema } from "@/types/responses/auth/register";

export const Register = () => {

  const api = useApis();
  const auth = useAuth();
  const { log } = useLogger("RegisterPage");

  const handleRegister = async (values: RegisterRequest) => {
    const toastId = toast.loading("登録中...");
    await api.auth.register(values).then((response) => {
      const parsed = RegisterResponseSchema.parse(response)

      // handleLoginは実質的にトークン処理を行う→このサービスにおいては登録時自動でログインするため
      auth.handleLogin(parsed.token);

      toast.update(toastId, { render: "登録に成功しました", type: "success", isLoading: false });
    }).catch((error) => {
      log("Failed to register", error, "ERROR");
      toast.update(toastId, { render: error.message, type: "error", isLoading: false });
    });
  };

  return (
    <AuthLayout>
      <div className="text-center text-[25px] font-bold mb-6">新規登録</div>

      <Formik
        initialValues={{ username: "", password: "", passwordConfirmation: "" }}
        validationSchema={toFormikValidationSchema(registerFormSchema)}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="ユーザー名"
                type="text"
                value={values.username}
                isInvalid={!!errors.username && !!touched.username}
                errorMessage={errors.username}
                onChange={handleChange("username")}
              />
              <Input
                variant="bordered"
                label="パスワード"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant="bordered"
                label="パスワード確認"
                type="password"
                value={values.passwordConfirmation}
                isInvalid={!!errors.passwordConfirmation && !!touched.passwordConfirmation}
                errorMessage={errors.passwordConfirmation}
                onChange={handleChange("passwordConfirmation")}
              />
            </div>

            <Button onPress={() => handleSubmit()} variant="flat" color="primary">
              登録
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        <Link to="/auth/login" className="font-bold">ログインはこちら</Link>
      </div>
    </AuthLayout>
  );
};
