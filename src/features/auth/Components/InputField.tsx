import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { SignupValidationSchema } from "../../../utils/signupValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LoginValidationSchema } from "../../../utils/loginValidation";
// import Control
const inputFieldStyle = `
  w-full px-3 py-2 text-sm leading-tight transition-all duration-300 hover:border-teal-200 outline-none text-gray-700 border
`;

interface InputFieldProps {
  name: keyof SignupValidationSchema;
  control: any;
  errors: any;
  label: string;
  type: string;
  onKeyDown: (field: keyof SignupValidationSchema) => void;
  //   onKeyUp: (field: keyof LoginValidationSchema) => void;
  className?: string;
}
const InputField = ({
  name,
  control,
  errors,
  label,
  type,
  onKeyDown,
}: InputFieldProps) => {
  const [isEyeShown, setIsEyeShown] = useState(false);
  //   const [fieldType, setFieldType] = useState(type);
  return (
    <div className="mb-4 transition-all duration-300 md:mr-2">
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative flex items-center justify-center">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={
                type === "password" ? (isEyeShown ? "text" : "password") : type
              }
              placeholder={label}
              className={`${inputFieldStyle}  ${
                errors[name] && "border-red-500 hover:border-red-500"
              }`}
              onKeyDown={() => onKeyDown(name)}
            />
          )}
        />
        {(type === "password" || label.toLowerCase().includes("password")) && (
          <FontAwesomeIcon
            icon={isEyeShown ? faEyeSlash : faEye}
            className="absolute cursor-pointer text-slate-400 right-2"
            onClick={() => {
              setIsEyeShown((prevEyeState) => !prevEyeState);
            }}
          />
        )}
      </div>
      {errors[name] && (
        <p className="mt-2 text-xs italic text-red-500">
          {errors[name]?.message}
        </p>
      )}
    </div>
    //   </div>
  );
};

export default InputField;
