import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../components/Elements/Button";
import React, { useState } from "react";

type UploadImageProps = {
  fileDataURL: string;
  index: number;
  removeFile: () => void;
  className: string;
};
const UploadImage = ({
  fileDataURL,
  index,
  removeFile,
  className,
}: UploadImageProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative flex  transition-all duration-300 cursor-pointer ${className} bg-black`}
      key={fileDataURL + index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={fileDataURL}
        className={`object-contain w-full h-full transition-all duration-300 ${
          hovered && "opacity-50"
        }`}
        alt="file"
      />
      {!fileDataURL.includes("http://") && hovered && (
        <Button
          // onMouseEnter={() => setHovered(true)}
          // onMouseLeave={() => setHovered(true)}
          variant="danger"
          size="xs"
          className="absolute z-50 w-8 h-8 translate-x-1/2 translate-y-1/2 rounded-full pointer-events-none right-1/2 bottom-1/2 hover:opacity-100 bg-gradient-to-r from-red-200 to-red-500"
          style={{ pointerEvents: hovered ? "auto" : "none" }}
          onClick={removeFile}
        >
          <FontAwesomeIcon className="" icon={faTimes} />
        </Button>
      )}
    </div>
  );
};

export default UploadImage;
