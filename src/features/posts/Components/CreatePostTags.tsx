import React, { KeyboardEvent, useState } from "react";
import CreateTags from "./CreateTags";
import { TOTAL_TAGS } from "../../../config/constants";

type CreatePostProps = {
  tags: string[];
  removeTag: (tag: string) => void;
  handleTotalAllowedTags: () => void;
  tagRef: React.RefObject<HTMLInputElement>;
  onKeyDownTag: (e: KeyboardEvent) => void;
};
const CreatePostTags = ({
  tags,
  removeTag,
  handleTotalAllowedTags,
  tagRef,
  onKeyDownTag,
}: CreatePostProps) => {
  return (
    <div className="flex flex-col w-full h-auto gap-2 mt-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <CreateTags
            key={tag + index}
            tag={tag}
            removeTag={() => removeTag(tag)}
          />
        ))}
      </div>
      <input
        name="tag"
        type="text"
        className="w-full p-2 mt-2 border shadow-lg md:mt-1 rounded-xl focus:outline-none"
        placeholder="Add 🔖tags and press enter"
        ref={tagRef}
        onKeyDown={(e) => onKeyDownTag(e)}
        disabled={tags.length >= TOTAL_TAGS}
        onChange={handleTotalAllowedTags}
      />
    </div>
  );
};

export default CreatePostTags;
