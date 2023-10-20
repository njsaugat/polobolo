import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type BookmarkProps = {
  className?: string;
  handleBookmarkPost: () => void;
  isBookmarkedPost: boolean;
};
const Bookmark = ({
  className,
  handleBookmarkPost,
  isBookmarkedPost,
}: BookmarkProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedPost);
  return (
    <button
      onClick={() => {
        setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
        handleBookmarkPost();
      }}
      className={`  hover:animate-pulse hover:text-teal-600 ${
        isBookmarked ? "text-teal-500 " : " text-slate-200    "
      } ${className}`}
    >
      <FontAwesomeIcon icon={faBookmark} />
    </button>
  );
};

export default Bookmark;
