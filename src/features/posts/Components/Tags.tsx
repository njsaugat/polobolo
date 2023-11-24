import React from "react";
import { PostCardProp, PostCardProps } from "../types/postType";
import { Link, useParams } from "react-router-dom";

const Tags = ({ post }: PostCardProp) => {
  const { tag } = useParams();
  return (
    <>
      <div className="flex flex-wrap mt-4 text-sm gap-x-2 gap-y-3">
        {post.tags.map((currentTag, index) => (
          <Link key={index + currentTag} to={`/posts/tags/${currentTag}`}>
            <span
              className={`px-2 py-1 mr-2  rounded-full cursor-pointer ${
                currentTag === tag
                  ? "bg-slate-700 text-gray-200 font-bold"
                  : " text-gray-700 bg-gray-200 "
              }`}
            >
              #{currentTag}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Tags;
