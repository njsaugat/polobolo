import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type LikeProps = {
  className?: string;
  isLike?: boolean;
};
const Like = ({ className, isLike }: LikeProps) => {
  const [isLiked, setIsLiked] = useState(isLike ? isLike : false);
  return (
    <button
      onClick={() => setIsLiked((prevIsLiked) => !prevIsLiked)}
      className={`  hover:animate-pulse hover:text-red-600 ${
        isLiked ? "text-red-500 " : " text-slate-200    "
      } ${className}`}
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
};

export default Like;
