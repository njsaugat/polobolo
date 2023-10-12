import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

type CloseModalProps = {
  closeModal: () => void;
};
const CloseModal = ({ closeModal }: CloseModalProps) => {
  return (
    <Button
      variant="blend"
      className="fixed w-10 h-10 p-0 px-0 py-0 rounded-full focus:outline-none top-1 md:top-1 right-1 bg-slate-300"
      onClick={closeModal}
      style={{padding:'0px'}}
    >
      <FontAwesomeIcon icon={faTimes} className="text-xl" />
    </Button>
  );
};

export default CloseModal;
