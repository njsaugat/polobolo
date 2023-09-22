import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../components/Logo";
import {
  LoginValidationSchema,
  loginValidationSchema,
} from "../../utils/loginValidation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const inputFieldStyle = `
  w-full px-3 py-2 text-sm leading-tight transition-all duration-300 hover:border-teal-200 outline-none text-gray-700 border
`;
const Login = () => {
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
  });
  const handleInputChange = async (field: keyof LoginValidationSchema) => {
    await trigger(field); // Trigger validation for the specified field
  };
  const [isEyeShown, setIsEyeShown] = useState(false);
  const onSubmit: SubmitHandler<LoginValidationSchema> = (data) => {
    console.log("data", data);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-center my-12">
        <div className="w-full p-5 bg-white rounded-lg shadow-xl lg:w-11/12">
          <h3 className="pt-4 text-2xl font-bold text-center ">Login</h3>
          <form
            className="px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue=""
                    className={`${inputFieldStyle} ${
                      errors.email && "border-red-500"
                    } rounded appearance-none focus:outline-none focus:shadow-outline`}
                    onKeyDown={() => handleInputChange("email")}
                  />
                )}
              />
              {errors.email && (
                <p className="mt-2 text-xs italic text-red-500 hover:border-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="password"
                    type={isEyeShown ? "text" : "password"}
                    placeholder="Password"
                    className={`${inputFieldStyle} ${
                      errors.password && "border-red-500 hover:border-red-500"
                    } rounded appearance-none focus:outline-none focus:shadow-outline`}
                    onKeyDown={() => handleInputChange("password")}
                  />
                )}
              />
              {
                <FontAwesomeIcon
                  icon={isEyeShown ? faEyeSlash : faEye}
                  className="absolute cursor-pointer text-slate-400 right-2 top-9"
                  onClick={() => {
                    setIsEyeShown((prevEyeState) => !prevEyeState);
                  }}
                />
              }
              {errors.password && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="mb-6 text-center">
              <button
                // disabled ={!isValid}
                className="w-full px-4 py-2 font-bold rounded-full text-slate-700 bg-gradient-to-r from-teal-200 to-teal-500 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
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
              Don't have an account? &nbsp;
              <Link
                className="inline-block text-sm text-teal-500 align-baseline hover:text-teal-800"
                to={"/signup"}
              >
                Signup !
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
