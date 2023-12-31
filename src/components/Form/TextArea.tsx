import { ForwardedRef, forwardRef } from "react";
import { Controller } from "react-hook-form";
export const inputFieldStyle = `
  w-full px-3 py-2 text-sm leading-tight transition-all duration-300 hover:border-teal-200 outline-none text-gray-700 border 
`;

interface TextAreaProps<SchemaType> {
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
  defaultValue: string;
  isNotIncreasePostHeight?: boolean;
}
function calcHeight(value: string) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  if (numberOfLineBreaks > 7) {
    return 200;
  }
  let newHeight = 27 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
}
const TextArea = forwardRef(
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
      isNotIncreasePostHeight,
    }: TextAreaProps<SchemaType>,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div
        className={`z-50  mb-4 transition-all duration-300 md:mr-2 ${
          isNotIncreasePostHeight ? "w-full" : "w-11/12"
        }`}
      >
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
        <div className={`relative flex items-center justify-center  `}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id={name}
                ref={ref}
                placeholder={placeholder ? placeholder : label}
                defaultValue={defaultValue}
                className={`${inputFieldStyle}  resize-none h-10 overflow-auto pr-10 ${
                  errors[name] && "border-red-500 hover:border-red-500 "
                }  ${className}`}
                onKeyDown={() => onKeyDown(name)}
                onKeyUp={
                  !isNotIncreasePostHeight
                    ? () => {
                        if (ref && "current" in ref && ref?.current) {
                          ref.current.style.height =
                            calcHeight(ref?.current.value) + "px";
                        }
                      }
                    : () => {}
                }
              ></textarea>
            )}
          />
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

export default TextArea as <SchemaType>(
  props: TextAreaProps<SchemaType> | { ref: ForwardedRef<HTMLTextAreaElement> }
) => JSX.Element;
