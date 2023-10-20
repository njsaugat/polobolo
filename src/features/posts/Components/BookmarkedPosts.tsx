import React from "react";
import Posts from "./Posts";

const Bookmarks = () => {
  return (
    <div>
      <h1 className="my-5 text-2xl text-center md:text-3xl">
        {/* Explore <span className="font-bold">#{tag}</span> Posts */}
      </h1>
      <Posts bookmarks={true} />
    </div>
  );
};

export default Bookmarks;
