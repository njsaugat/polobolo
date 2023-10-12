import cslx from "clsx";
import * as React from "react";

import { Spinner } from "./Spinner";

const variants = {
  primary: "bg-blue-600 text-slate-700",
  inverse: "bg-white text-teal-600",
  danger: "bg-gradient-to-l from-red-200 to-red-500 text-white",
  blend: "bg-gradient-to-r from-teal-100 to-teal-200 border-none",
  light: "bg-gradient-to-t from-slate-300 to-teal-300 border-none",
};

const sizes = {
  xs: "py-0 px-0",
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cslx(
          "flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed    hover:opacity-80 bg-gradient-to-r from-teal-200 to-teal-500 focus:outline-none focus:shadow-outline",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size ? size : "md"} className="text-current" />
        ) : (
          <span className="mx-2">{props.children}</span>
        )}
        {!isLoading && startIcon}

        {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
