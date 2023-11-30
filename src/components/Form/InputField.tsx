import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ForwardedRef, forwardRef } from "react";
import { Controller } from "react-hook-form";
import { useDisclosure } from "../../hooks/useDisclosure";
export const inputFieldStyle = `
  w-full px-3 py-2 text-sm leading-tight transition-all duration-300 hover:border-teal-200 outline-none text-gray-700 border`;

interface InputFieldProps<SchemaType> {
  name: string & keyof SchemaType;
  control: any;
  errors: any;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  type: string;
  onKeyDown: (field: keyof SchemaType) => void;
  className?: string;
  children?: React.ReactNode;
  defaultValue?: string;
}

const InputField = forwardRef(
  <SchemaType extends Record<string, any>>(
    {
      name,
      control,
      errors,
      label = "",
      type = "text",
      placeholder,
      className,
      onKeyDown,
      children,
      onChange,
      onKeyUp,
      disabled,
      defaultValue,
    }: InputFieldProps<SchemaType>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { isOpen: isEyeShown, toggle: toggleEye } = useDisclosure(false);
    return (
      <div
        className={`${
          type === "checkbox"
            ? "flex  flex-row-reverse items-center space-x-2 justify-between h-auto w-4/5 md:w-3/5 lg:w-[46%]"
            : null
        } mb-4 transition-all duration-300 md:mr-2`}
      >
        <label
          className={`block ${
            type === "checkbox" ? "" : "mb-2"
          }  text-sm font-bold text-gray-700`}
          htmlFor={name}
        >
          {label}
        </label>
        <div className={`relative flex items-center justify-center `}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id={name}
                type={
                  type === "password"
                    ? isEyeShown
                      ? "text"
                      : "password"
                    : type
                }
                defaultValue={defaultValue ? defaultValue : ""}
                placeholder={placeholder ? placeholder : label}
                className={`${inputFieldStyle}   ${
                  errors[name] && "border-red-500 hover:border-red-500 "
                }  ${className}`}
                onKeyDown={() => onKeyDown(name)}
                ref={ref}
              />
            )}
          />
          {(type === "password" ||
            label.toLowerCase().includes("password")) && (
            <FontAwesomeIcon
              icon={isEyeShown ? faEyeSlash : faEye}
              className="absolute cursor-pointer text-slate-400 right-2"
              onClick={toggleEye}
            />
          )}
          {children}
        </div>
        {errors[name] && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }
);

export default InputField as <SchemaType>(
  props: InputFieldProps<SchemaType> | { ref: ForwardedRef<HTMLInputElement> }
) => JSX.Element;
