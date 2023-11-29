import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Elements/Button";
import { Dialog } from "../../../components/Elements/Dialog";
export type DeletePostDialogProps = {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: () => void;
  content: string;
  isLoading?: boolean;
};
const DeletePost = ({
  isOpen,
  closeModal,
  handleDelete,
  content,
  isLoading,
}: DeletePostDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog
      className="z-50 rounded-lg md:w-1/2 lg:w-1/3 deleteDialog "
      isOpen={isOpen}
      closeModal={closeModal}
      modalClassName="z-50 mx-10"
    >
      <h1 className="text-center">{content}</h1>
      <div className="flex justify-center w-full gap-4 mt-4 mb-0">
        <Button
          variant="blend"
          onClick={() => {
            closeModal();
          }}
        >
          {t("userPages.no")}
        </Button>
        <Button
          variant="danger"
          className="font-extrabold tracking-wider "
          isLoading={isLoading}
          onClick={() => {
            handleDelete();
          }}
        >
          {t("userPages.yes")}
        </Button>
      </div>
    </Dialog>
  );
};

export default DeletePost;
