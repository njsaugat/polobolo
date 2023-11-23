import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignupValidationSchema,
  signupValidationSchema,
} from "../utils/signupValidation";
import InputField from "../../../components/Form/InputField";

import useRegisterUser from "../api/registerUser";
import { Button } from "../../../components/Elements/Button";
import AuthFormEnhancements from "./AuthFormEnhancements";

const Signup = () => {
  const {
    control,
    register,
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

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-center my-12">
        <div className="w-full p-5 bg-white rounded-lg shadow-xl lg:w-full">
          <h3 className="pt-4 text-2xl font-bold text-center ">
            Create New Account
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
                label="First Name"
                type="text"
                onKeyDown={handleInputChange}
              />

              <InputField<SignupValidationSchema>
                name="lastName"
                control={control}
                errors={errors}
                label="Last Name"
                type="text"
                onKeyDown={handleInputChange}
              />
            </div>
            <InputField<SignupValidationSchema>
              name="email"
              control={control}
              errors={errors || error}
              label="Email"
              type="text"
              onKeyDown={handleInputChange}
              className="w-full"
            />
            <InputField<SignupValidationSchema>
              name="password"
              control={control}
              errors={errors}
              label="Password"
              type="password"
              onKeyDown={handleInputChange}
            />
            <InputField<SignupValidationSchema>
              name="confirmPassword"
              control={control}
              errors={errors}
              label="Confirm Password"
              type="password"
              onKeyDown={handleInputChange}
            />
            <InputField<SignupValidationSchema>
              name="terms"
              control={control}
              errors={errors}
              label="Accept Terms & Conditions"
              type="checkbox"
              onKeyDown={() => {}}
            />

            <Button
              className="w-full px-4 py-2 font-bold rounded-full text-slate-700 hover:animate-pulse bg-gradient-to-r from-teal-200 to-teal-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              isLoading={isLoading}
            >
              Register Account
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
