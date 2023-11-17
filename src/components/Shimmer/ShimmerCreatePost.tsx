import React from "react";
import ShimmerAvatar from "./ShimmerAvatar";

const ShimmerCreatePost = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <ShimmerAvatar>
          <p className="w-full h-10 mt-6 mb-0 bg-gray-400 rounded-full animate-pulse "></p>
        </ShimmerAvatar>
      </div>
      <div className="flex justify-around w-full ">
        <div className="w-16 h-4 animate-pulse bg-slate-300"></div>
        <div className="w-16 h-4 animate-pulse bg-slate-300"></div>
      </div>
    </div>
  );
};

export default ShimmerCreatePost;
