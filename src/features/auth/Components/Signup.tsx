import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/Form/InputField";
import {
  SignupValidationSchema,
  signupValidationSchema,
} from "../utils/signupValidation";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/Elements/Button";
import useRegisterUser from "../api/registerUser";
import AuthFormEnhancements from "./AuthFormEnhancements";

const Signup = () => {
  const { email } = useParams();
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupValidationSchema>({
    resolver: zodResolver(signupValidationSchema),
  });
  const handleInputChange = async (field: keyof SignupValidationSchema) => {
    await trigger(field);
  };
  const { mutate, error, isLoading } = useRegisterUser();
  const onSubmit: SubmitHandler<SignupValidationSchema> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
      role: "USER",
      username:
        data.firstName.toLowerCase() + "_" + data.lastName.toLowerCase(),
    });
  };
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-center my-12">
        <div className="w-full p-5 bg-white rounded-lg shadow-xl lg:w-full">
          <h3 className="pt-4 text-2xl font-bold text-center ">
            {t("authPage.createAccount")}
          </h3>
          <form
            className="px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" md:flex md:justify-between">
              <InputField<SignupValidationSchema>
                name="firstName"
                control={control}
                errors={errors}
                label={t("authPage.firstName")}
                type="text"
                onKeyDown={handleInputChange}
              />

              <InputField<SignupValidationSchema>
                name="lastName"
                control={control}
                errors={errors}
                label={t("authPage.lastName")}
                type="text"
                onKeyDown={handleInputChange}
              />
            </div>
            <InputField<SignupValidationSchema>
              name="email"
              control={control}
              errors={errors || error}
              label={t("authPage.email")}
              type="text"
              onKeyDown={handleInputChange}
              className="w-full"
              defaultValue={email ?? ""}
            />
            <InputField<SignupValidationSchema>
              name="password"
              control={control}
              errors={errors}
              label={t("authPage.password")}
              type="password"
              onKeyDown={handleInputChange}
            />
            <InputField<SignupValidationSchema>
              name="confirmPassword"
              control={control}
              errors={errors}
              label={t("authPage.confirmPassword")}
              type="password"
              onKeyDown={handleInputChange}
            />
            <InputField<SignupValidationSchema>
              name="terms"
              control={control}
              errors={errors}
              label={t("authPage.acceptTOC")}
              type="checkbox"
              onKeyDown={() => {}}
            />

            <Button
              className="w-full px-4 py-2 font-bold rounded-full text-slate-700 hover:animate-pulse bg-gradient-to-r from-teal-200 to-teal-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              isLoading={isLoading}
            >
              {t("authPage.registerAccount")}
            </Button>
            <hr className="my-6 border-t" />
            <AuthFormEnhancements formType="login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
