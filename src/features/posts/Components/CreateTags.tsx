import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type CreateTagsProps = {
  tag: string;
  removeTag: () => void;
};
const CreateTags = ({ tag, removeTag }: CreateTagsProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`border p-2 px-6 flex rounded-full relative bg-slate-200  `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`transition-all duration-300 text-sm ${
          hovered && "opacity-50"
        }`}
      >
        #{tag}
      </span>
      {hovered && (
        <button
          onClick={removeTag}
          className="absolute z-50 flex items-center justify-center w-6 h-6 rounded-full pointer-events-none right-1 hover:opacity-100 bg-slate-300"
          style={{ pointerEvents: hovered ? "auto" : "none" }}
        >
          <FontAwesomeIcon className="" icon={faTimes} />
        </button>
      )}
    </span>
  );
};

export default CreateTags;
