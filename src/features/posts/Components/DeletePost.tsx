import { Button } from "../../../components/Elements/Button";
import { Dialog } from "../../../components/Elements/Dialog";
import React from "react";
import deletePost from "../api/deletePost";
import { Post } from "../types/postType";
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
  return (
    <Dialog
      className=" md:w-1/2 lg:w-1/3  min-h-[10rem] rounded-lg"
      isOpen={isOpen}
      closeModal={closeModal}
      modalClassName="mx-10"
    >
      <h1 className="text-center">{content}</h1>
      <div className="flex justify-center w-full gap-4 mt-4 mb-0">
        <Button variant="blend" onClick={closeModal}>
          NO
        </Button>
        <Button
          variant="danger"
          className="font-extrabold tracking-wider "
          isLoading={isLoading}
          onClick={() => {
            handleDelete();
          }}
        >
          Yes
        </Button>
      </div>
    </Dialog>
  );
};

export default DeletePost;
