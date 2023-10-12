import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignupValidationSchema,
  signupValidationSchema,
} from "../utils/signupValidation";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";

import useRegisterUser from "../api/useRegisterUser";
import { Button } from "../../../components/Elements/Button";
import useAuthCheck from "../../../hooks/useAuthCheck";

const Signup = () => {
  // useAuthCheck();
  const navigate = useNavigate();
  const isLoggedIn = useAuthCheck();
  if (isLoggedIn) {
    navigate("/home");
  }
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
    await trigger(field); // Trigger validation for the specified field
  };
  const { mutate, error, isLoading } = useRegisterUser();
  const onSubmit: SubmitHandler<SignupValidationSchema> = (data) => {
    console.log("data", data);
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
            <div className="mb-4">
              <input type="checkbox" id="terms" {...register("terms")} />
              <label
                htmlFor="terms"
                className={`ml-2 mb-2 text-sm font-bold ${
                  errors.terms ? "text-red-500" : "text-gray-700"
                }`}
              >
                Accept Terms & Conditions
              </label>
              {errors.terms && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.terms?.message}
                </p>
              )}
            </div>
            <div className="mb-6 text-center">
              <Button
                className="w-full px-4 py-2 font-bold rounded-full text-slate-700 hover:animate-pulse bg-gradient-to-r from-teal-200 to-teal-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                isLoading={isLoading}
              >
                Register Account
              </Button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <a
                className="inline-block text-sm text-teal-500 align-baseline hover:text-teal-800"
                href="#test"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-sm text-center">
              Already have an account? &nbsp;
              <Link
                className="inline-block text-teal-500 align-baseline hover:text-teal-800"
                to={"/login"}
              >
                Login !
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
