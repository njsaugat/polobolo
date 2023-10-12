import React from "react";
import { PostCardProp, PostCardProps } from "../types/postType";

const Tags = ({ post }: PostCardProp) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4 text-sm">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 mr-2 text-gray-700 bg-gray-200 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default Tags;
