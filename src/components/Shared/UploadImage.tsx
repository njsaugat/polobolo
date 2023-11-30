import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "../../hooks/useDisclosure";
import { Button } from "../Elements/Button";

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
  const {
    isOpen: isHovered,
    open: openHover,
    close: closeHover,
  } = useDisclosure(false);

  return (
    <div
      className={`relative flex  transition-all duration-300 cursor-pointer ${className} bg-black`}
      key={fileDataURL + index}
      onMouseEnter={openHover}
      onMouseLeave={closeHover}
    >
      <img
        src={fileDataURL}
        className={`object-contain w-full h-full transition-all duration-300 ${
          isHovered && "opacity-50"
        }`}
        alt="file"
      />
      {!fileDataURL.includes("http://") && isHovered && (
        <Button
          variant="danger"
          size="xs"
          className="absolute z-50 w-8 h-8 translate-x-1/2 translate-y-1/2 rounded-full pointer-events-none right-1/2 bottom-1/2 hover:opacity-100 bg-gradient-to-r from-red-200 to-red-500"
          style={{ pointerEvents: isHovered ? "auto" : "none" }}
          onClick={removeFile}
        >
          <FontAwesomeIcon className="" icon={faTimes} />
        </Button>
      )}
    </div>
  );
};

export default UploadImage;
