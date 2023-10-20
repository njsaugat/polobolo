import React from "react";
import ShimmerAvatar from "./ShimmerAvatar";

const Shimmer = () => {
  return (
    <div className="w-full p-4 ">
      <div className="h-full overflow-hidden border-gray-200 rounded-lg ">
        <div className="p-6 ">
          <ShimmerAvatar />
          <p className="w-full h-3 mb-3 leading-relaxed bg-gray-300 animate-pulse"></p>
          <p className="w-2/3 h-3 mb-3 leading-relaxed bg-gray-300 animate-pulse"></p>
          <p className="w-1/2 h-3 mb-3 leading-relaxed bg-gray-300 animate-pulse"></p>
          <div className="object-cover object-center h-16 mx-2 my-8 bg-gray-200 animate-pulse lg:h-48 md:h-36"></div>
          <div className="flex flex-wrap gap-2 mt-4 text-sm animate-pulse">
            {new Array(4).fill(1).map((tag, index) => (
              <span
                key={index + tag}
                className="w-16 h-4 px-2 py-1 mr-2 text-gray-700 bg-gray-200 "
              ></span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center ">
          <a className="inline-flex items-center w-32 h-4 mt-2 bg-teal-100 animate-pulse md:mb-2 lg:mb-0"></a>
          <span className="inline-flex items-center w-16 h-4 px-2 py-1 pr-5 mt-2 ml-auto mr-3 text-sm leading-none bg-teal-100 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
