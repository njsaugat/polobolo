import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
type CommentContentProps = {
  content: string;
};

function getMaxLength(windowSize: number) {
  if (windowSize < 400) {
    return 50;
  } else if (windowSize < 720) {
    return 100;
  } else if (windowSize < 1024) {
    return 150;
  }
  return 200;
}

const CommentContent = ({ content }: CommentContentProps) => {
  const [showMore, setShowMore] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const updateWindowSize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  const maxLength = getMaxLength(windowSize);
  const isToggleRequired = content.length > maxLength;
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="text-sm transition-all duration-500">
      {showMore ? (
        <span>{content}</span>
      ) : (
        <span>
          {isToggleRequired ? `${content.substring(0, maxLength)}...` : content}
        </span>
      )}
      &nbsp; &nbsp;
      {isToggleRequired && (
        <button
          className="text-sm italic text-teal-400 hover:animate-pulse"
          onClick={toggleShowMore}
        >
          {showMore ? (
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          ) : (
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          )}
        </button>
      )}
    </div>
  );
};

export default CommentContent;
