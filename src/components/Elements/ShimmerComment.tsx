import React from "react";
import ShimmerAvatar from "./ShimmerAvatar";

const ShimmerComment = () => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <ShimmerAvatar>
        <p className="w-full h-2 mt-2 mb-2 bg-gray-400 animate-pulse"></p>
        <p className="w-10/12 h-2 mb-2 bg-gray-400 animate-pulse"></p>

        </ShimmerAvatar>
      </div>
      <div className="w-4 h-4 animate-pulse bg-slate-500"></div>
    </div>
  );
};

export default ShimmerComment;
