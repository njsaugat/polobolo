import React from "react";
import ShimmerAvatar from "./ShimmerAvatar";

const ShimmerComment = ({
  isChat,
  className,
}: {
  isChat?: boolean;
  className?: string;
}) => {
  return (
    <div className={`flex  w-full ${className}`}>
      <div className="flex flex-col w-full">
        <ShimmerAvatar className={className}>
          <p
            className={`${className ? "w-0" : "w-full"}  
            bg-gray-400
            h-2 mt-2 mb-2  animate-pulse`}
          ></p>
          {!isChat ? (
            <p className={`w-10/12 h-2 mb-2 bg-gray-400 animate-pulse`}></p>
          ) : null}
        </ShimmerAvatar>
      </div>
      <div
        className={`${
          isChat ? " h-2 w-16 " : "w-4 h-4"
        }  animate-pulse bg-slate-500`}
      ></div>
    </div>
  );
};

export default ShimmerComment;
