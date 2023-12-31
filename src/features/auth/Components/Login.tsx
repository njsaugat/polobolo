import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "stores/store";
import { Button } from "../../../components/Elements/Button";
import InputField from "../../../components/Form/InputField";
import useAuthCheck from "../../../hooks/useAuthCheck";
import useLoginUser from "../api/loginUser";
import {
  LoginValidationSchema,
  loginValidationSchema,
} from "../utils/loginValidation";
import AuthFormEnhancements from "./AuthFormEnhancements";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthCheck();
  const { t } = useTranslation();
  const isInitialLogin = useSelector<RootState, boolean>(
    (store) => store.user.isInitialLogin
  );
  useEffect(() => {
    if (isLoggedIn) {
      if (isInitialLogin) {
        navigate("/onboarding");
      } else {
        navigate("/home");
      }
    }
  }, [isLoggedIn]);
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
  });
  const handleInputChange = async (field: keyof LoginValidationSchema) => {
    await trigger(field);
  };

  const { mutate, error, isLoading } = useLoginUser();
  const onSubmit: SubmitHandler<LoginValidationSchema> = (data) => {
    mutate(data);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-center my-12">
        <div className="w-full p-5 bg-white rounded-lg shadow-xl lg:w-11/12">
          <h3 className="pt-4 text-2xl font-bold text-center ">
            {t("authPage.welcome")}
          </h3>
          <form
            className="px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField<LoginValidationSchema>
              name="email"
              control={control}
              errors={errors || error}
              label={t("authPage.email")}
              type="text"
              onKeyDown={handleInputChange}
              className="w-full"
            />
            <InputField<LoginValidationSchema>
              name="password"
              control={control}
              errors={errors || error}
              label={t("authPage.password")}
              type="password"
              onKeyDown={handleInputChange}
            />
            <div className="mb-6 text-center">
              <Button
                className="w-full px-4 py-2 font-bold rounded-full text-slate-700 hover:animate-pulse bg-gradient-to-r from-teal-200 to-teal-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                isLoading={isLoading}
              >
                {t("landingPage.login")}
              </Button>
            </div>
            <hr className="mb-6 border-t" />
            <AuthFormEnhancements formType="signup" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
