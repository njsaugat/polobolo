import React from "react";
import ShimmerCreatePost from "./ShimmerCreatePost";
import Shimmer from "./Shimmer";

const ShimmerPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 overflow-hidden ">
      <div className="w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2">
        <ShimmerCreatePost />
      </div>
      {new Array(6).fill(1).map((value, index) => (
        <div
          key={value + index}
          className="w-11/12 p-4 bg-white rounded-lg shadow-2xl drop- md:w-3/5 lg:w-1/2"
        >
          <Shimmer />
        </div>
      ))}
    </div>
  );
};

export default ShimmerPosts;
