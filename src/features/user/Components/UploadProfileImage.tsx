import { Button } from "../../../components/Elements/Button";
import CloseModal from "../../../components/Elements/CloseModal";
import { Dialog } from "../../../components/Elements/Dialog";
import DragAndDrop from "../../../components/Shared/DragDropPhotos";
import { useState } from "react";
import postImage from "../api/postImage";

type UploadProfileImageProps = {
  isImageUploadOpen: boolean;
  closeModal: () => void;
  title: string;
  coverImageExist?: boolean;
};
const UploadProfileImage = ({
  isImageUploadOpen,
  closeModal,
  title,
  coverImageExist,
}: UploadProfileImageProps) => {
  const [fileDataURLs, setFileDataURLs] = useState<string[]>([]);
  const {
    mutate,
    error: postError,
    isLoading: isPostImageLoading,
  } = postImage(coverImageExist);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    const dataURL = fileDataURLs[0];
    const base64String = dataURL.split(",")[1]; // Split the Data URL to get the base64 part
    const binaryData = atob(base64String);
    const blob = new Blob(
      [new Uint8Array([...binaryData].map((char) => char.charCodeAt(0)))],
      { type: "application/octet-stream" }
    );
    if (coverImageExist) {
      formData.append(`coverImage`, blob, `file.png`);
    } else {
      formData.append(`avatar`, blob, `file.png`);
    }
    mutate(formData);
    closeModal();
    setFileDataURLs([]);
  };
  return (
    <>
      <Dialog
        isOpen={isImageUploadOpen}
        closeModal={closeModal}
        className="deleteDialog md:w-3/5 lg:w-2/5 md:rounded-lg"
      >
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            // e.preventDefault();
            handleSubmit(e);
          }}
        >
          <h1 className="font-bold text-center">{title}</h1>
          <CloseModal closeModal={closeModal} variant="transparent" />
          <DragAndDrop
            fileDataURLs={fileDataURLs}
            setFileDataURLs={setFileDataURLs}
            TOTAL_UPLOADABLE_IMAGES={1}
          />
          <Button
            variant={fileDataURLs.length < 1 ? "transparent" : "blend"}
            className={`${
              fileDataURLs.length < 1 ? "cursor-not-allowed" : ""
            } self-center mt-4 mb-2 border-none`}
            type="submit"
            // onClick={(e) => handleSubmit(e)}
          >
            ☁️ Upload
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export default UploadProfileImage;
