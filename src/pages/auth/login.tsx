import { LoginRequest } from "@/apis/endpoints/auth/login";
import { useApis } from "@/contexts/api-context";
import { loginFormSchema } from "@/types/validate/loginFormSchema";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { toast } from "react-toastify";
import { useLogger } from "@/hooks/use-logger";
import { AuthLayout } from "@/layouts/authLayout";

export const Login = () => {

  const api = useApis();
  const { log } = useLogger("LoginPage");

  const handleLogin = async (values: LoginRequest) => {
    const toastId = toast.loading("ログイン中...");
    await api.auth.login(values).then(() => {
      toast.update("ログインに成功しました", { toastId: toastId, type: "success" });
    }).catch((error) => {
      log("Failed to login", error, "ERROR");
      toast.update(error.message, { toastId: toastId, type: "error" });
    });
  };

  return (
    <AuthLayout>
      <div className="text-center text-[25px] font-bold mb-6">ログイン</div>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={toFormikValidationSchema(loginFormSchema)}
        onSubmit={handleLogin}
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
            </div>

            <Button onPress={() => handleSubmit()} variant="flat" color="primary">
              ログイン
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        {/* <Link href="/register" className="font-bold">新規登録</Link> */}
        <Link to="/auth/register" className="font-bold"> 新規登録</Link>
      </div>
    </AuthLayout>
  );
};
