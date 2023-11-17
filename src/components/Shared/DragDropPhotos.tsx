import { useEffect, useRef, useState } from "react";
import { addNotification } from "../../stores/notificationSlice";
import store from "../../stores/store";
import UploadImage from "./UploadImage";

type DragAndDropProps = {
  fileDataURLs: string[];
  setFileDataURLs: React.Dispatch<React.SetStateAction<string[]>>;
  TOTAL_UPLOADABLE_IMAGES: number;
};
export default function DragAndDrop({
  fileDataURLs,
  setFileDataURLs,
  TOTAL_UPLOADABLE_IMAGES = 6,
}: DragAndDropProps) {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  function addURLs(files: any) {
    if (fileDataURLs?.length <= TOTAL_UPLOADABLE_IMAGES - 1) {
      const result = URL.createObjectURL(files[files["length"] - 1]);
      setFileDataURLs((prevURLs) => [...prevURLs, result]);
    } else {
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "error",
          title: "Error",
          message: `Only ${TOTAL_UPLOADABLE_IMAGES} images are allowed to be uploaded.`,
        })
      );
    }
  }
  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleSubmitFile(e: any) {}

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFileURL(url: string, idx: number) {
    return setFileDataURLs((prevURLs) =>
      prevURLs.filter((prevURL, index) => {
        if (index !== idx) {
          return prevURL;
        }
      })
    );
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    const file = files[files?.length - 1];
    if (fileDataURLs?.length > TOTAL_UPLOADABLE_IMAGES - 1) {
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "error",
          title: "Error",
          message: `Only ${TOTAL_UPLOADABLE_IMAGES} images allowed to be uploaded.`,
        })
      );
    } else if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURLs((prevURLs) => [...prevURLs, result]);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [files]);

  return (
    <div
      className={`${
        dragActive
          ? "bg-gradient-to-r from-teal-200 to-teal-400"
          : "bg-gradient-to-r from-teal-50 to-teal-200"
      }  p-4 w-full rounded-lg   min-h-[18rem] md:min-h-[26rem] lg:min-h-[20rem]  text-center flex flex-col items-center justify-center mt-12 md:mt-4 border-dashed border-2 border-slate-400   `}
      onDragEnter={handleDragEnter}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input
        placeholder="fileInput"
        className="hidden"
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        accept="image/*,"
      />

      {fileDataURLs.length === 1 && TOTAL_UPLOADABLE_IMAGES === 1 ? (
        <></>
      ) : (
        <p>
          <span className="hidden md:inline">
            🚀 Drag & Drop {TOTAL_UPLOADABLE_IMAGES === 1 ? "image" : "files"}{" "}
            or{" "}
          </span>
          <span
            className="font-bold text-teal-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u> Select {TOTAL_UPLOADABLE_IMAGES === 1 ? "image" : "files"} </u>
          </span>{" "}
          📂to upload
        </p>
      )}

      {fileDataURLs?.length >= 0 && (
        <div className="flex flex-col items-center justify-center w-full md:flex-row gap-y-2 md:flex-wrap gap-x-2">
          {fileDataURLs.map((fileDataURL, index) => {
            return (
              <UploadImage
                key={fileDataURL + index}
                fileDataURL={fileDataURL}
                index={index}
                removeFile={() => removeFileURL(fileDataURL, index)}
                className={
                  fileDataURLs?.length === 1 ? "w-full" : "w-64 md:w-48 md:h-32"
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
