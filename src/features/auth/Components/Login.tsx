import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginValidationSchema,
  loginValidationSchema,
} from "../utils/loginValidation";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/Form/InputField";
import { Button } from "../../../components/Elements/Button";
import useLoginUser from "../api/loginUser";
import { useEffect } from "react";
import useAuthCheck from "../../../hooks/useAuthCheck";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import AuthFormEnhancements from "./AuthFormEnhancements";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthCheck();
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
          <h3 className="pt-4 text-2xl font-bold text-center ">Welcome Back</h3>
          <form
            className="px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField<LoginValidationSchema>
              name="email"
              control={control}
              errors={errors || error}
              label="Email"
              type="text"
              onKeyDown={handleInputChange}
              className="w-full"
            />
            <InputField<LoginValidationSchema>
              name="password"
              control={control}
              errors={errors || error}
              label="Password"
              type="password"
              onKeyDown={handleInputChange}
            />
            <div className="mb-6 text-center">
              <Button
                className="w-full px-4 py-2 font-bold rounded-full text-slate-700 hover:animate-pulse bg-gradient-to-r from-teal-200 to-teal-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                isLoading={isLoading}
              >
                Login
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
