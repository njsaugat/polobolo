import React from "react";
import { PostCardProp, PostCardProps } from "../types/postType";

type PostAuthor = {
  className?: string;
};
const PostAuthor = ({ post, className }: PostCardProp & PostAuthor) => {
  return (
    <div className={` ${className}`}>
      <div className={`flex items-center space-x-4 `}>
        <img
          src={post.author.account.avatar.url}
          alt="Author Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {post.author.firstName} {post.author.lastName}
          </h2>
          <p className="text-gray-500">{post.author.bio}</p>
        </div>
      </div>
      <p className="mt-4">{post.content}</p>
    </div>
  );
};

export default PostAuthor;
