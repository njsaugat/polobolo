import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type BookmarkProps = {
  className?: string;
};
const Bookmark = ({ className }: BookmarkProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <button
      onClick={() => setIsLiked((prevIsLiked) => !prevIsLiked)}
      className={`  hover:animate-pulse hover:text-teal-600 ${
        isLiked ? "text-teal-500 " : " text-slate-200    "
      } ${className}`}
    >
      <FontAwesomeIcon icon={faBookmark} />
    </button>
  );
};

export default Bookmark;
