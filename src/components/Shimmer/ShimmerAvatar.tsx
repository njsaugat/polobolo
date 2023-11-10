import React, { ReactNode } from "react";
type ShimmerAvatarProps = {
  children?: ReactNode;
  className?: string;
};
const ShimmerAvatar = ({ children, className }: ShimmerAvatarProps) => {
  return (
    <div className={`flex w-full  ${className ? className : "mb-8"}`}>
      <div className="self-start w-1/6">
        <div className="w-12 h-12 rounded-full image bg-slate-200"></div>
      </div>
      <div className={`w-full mx-3 flex flex-col ${className} `}>
        <h1
          className={`w-1/2 h-6 mb-2 
      ${
        className?.includes("teal") ? "bg-teal-200" : "bg-gray-400"
      } animate-pulse`}
        ></h1>
        <h2
          className={`w-1/4 h-2 mb-4 
      ${className?.includes("teal") ? "bg-teal-200" : "bg-gray-400"}
         animate-pulse`}
        ></h2>
        {children}
      </div>
    </div>
  );
};

export default ShimmerAvatar;
