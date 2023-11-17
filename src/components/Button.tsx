import React from "react";

interface ButtonProps {
  actionItem: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}
const Button = ({ actionItem, type, className }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-gradient-to-r from-teal-200 to-teal-500 px-4 py-1 text-2xl rounded-md hover:bg-green-dark focus:outline-none my-1 ${className}`}
    >
      {actionItem}
    </button>
  );
};

export default Button;
