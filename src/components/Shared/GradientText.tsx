import React from "react";
import { LogoProps } from "./Logo";

const GradientText = ({ content, className }: LogoProps) => {
  return (
    <h1
      className={`relative justify-center inline-block  text-6xl italic font-bold tracking-wider text-center text-transparent font-cursive bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text ${
        className ? "w-32" : "w-64"
      } ${className}`}
    >
      {content}
    </h1>
  );
};

export default GradientText;
