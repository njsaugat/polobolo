import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

type CloseModalProps = {
  closeModal: () => void;
  closeComment?: boolean;
  variant?: string;
};
const CloseModal = ({ closeModal, closeComment, variant }: CloseModalProps) => {
  return (
    <Button
      variant={variant ? "transparent" : closeComment ? "transparent" : "blend"}
      className={`${
        closeComment
          ? "-translate-y-1 border-0 text-slate-600"
          : "fixed top-1 md:top-1 right-1 "
      } w-10 h-10 p-0 px-0 py-0 rounded-full focus:outline-none  bg-slate-300 `}
      onClick={closeModal}
      style={{ padding: "0px" }}
    >
      <FontAwesomeIcon icon={faTimes} className="text-xl" />
    </Button>
  );
};

export default CloseModal;
