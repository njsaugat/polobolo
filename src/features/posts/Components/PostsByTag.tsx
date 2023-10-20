import React from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";

const PostsByTag = () => {
  const { tag } = useParams();
  return (
    <div>
      <h1 className="my-5 text-2xl text-center md:text-3xl">
        Explore <span className="font-bold">#{tag}</span> Posts
      </h1>
      <Posts tag={tag} />
    </div>
  );
};

export default PostsByTag;
