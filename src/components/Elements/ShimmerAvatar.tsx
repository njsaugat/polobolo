import React, { ReactNode } from "react";
type ShimmerAvatarProps = {
  children?: ReactNode;
};
const ShimmerAvatar = ({ children }: ShimmerAvatarProps) => {
  return (
    <div className="flex w-full mb-8">
      <div className="w-1/6">
        <div className="w-12 h-12 rounded-full image bg-slate-200"></div>
      </div>
      <div className="w-full x-3 ">
        <h1 className="w-1/2 h-6 mb-2 bg-gray-400 animate-pulse"></h1>
        <h2 className="w-1/4 h-2 mb-4 bg-gray-400 animate-pulse"></h2>
        {children}
      </div>
    </div>
  );
};

export default ShimmerAvatar;
