import { loginFormSchema } from "@/types/validate/loginFormSchema";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const Login = () => {

  const handleLogin = (values: { username: string; password: string }) => {
    // TODO: impl
    console.log(values);
  };

  return (
    <>
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
        <Link to="/register" className="font-bold"> 新規登録</Link>
      </div>
    </>
  );
};
