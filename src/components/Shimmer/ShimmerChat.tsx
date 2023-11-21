import React from "react";
import ShimmerChatList from "./ShimmerChatList";
import ShimmerChatSection from "./ShimmerChatSection";

const ShimmerChat = () => {
  return (
    <div className="w-screen flex border-t-[0.1px] h-[calc(100vh-115px)] overflow-auto  ">
      <div className="w-full md:w-2/5 lg:w-1/3 border-r-[0.1px] h-full pt-4">
        <ShimmerChatList />
      </div>
      <div className="hidden w-full h-full md:block md:w-3/5 lg:w-2/3">
        <ShimmerChatSection />
      </div>
    </div>
  );
};

export default ShimmerChat;
