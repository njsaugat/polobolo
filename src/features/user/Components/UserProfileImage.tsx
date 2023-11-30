import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import LoadImage from "../../../components/Elements/LoadImage";
import { useDisclosure } from "../../../hooks/useDisclosure";
import UploadProfileImage from "./UploadProfileImage";

type UserProfileImage = {
  isUserAdmin: boolean;
  url: string | undefined;
  isCover: boolean;
  coverTitle?: string;
};
const coverImageClassname =
  "relative object-cover w-full h-56 transition-all rounded-t-lg duration-800 md:h-48 lg:h-72 bg-theme-color bg-gradient-to-r from-teal-200 to-teal-500";
const profileImageClassname =
  "absolute bottom-0 w-40 h-40 mb-2 transition-all duration-300 transform -translate-x-1/2 translate-y-1/2 border-4 rounded-full cursor-pointer border-slate-200 lg:translate-y-3/4 lg:w-40 lg:h-40 lg:mb-16 left-1/2 ";

const UserProfileImage = ({
  isUserAdmin,
  url,
  isCover,
  coverTitle,
}: UserProfileImage) => {
  const {
    isOpen: isHovered,
    open: openHover,
    close: closeHover,
  } = useDisclosure(false);
  const {
    isOpen: isImageUploadOpen,
    open: openImageUpload,
    close: closeImageUpload,
  } = useDisclosure(false);
  return (
    <>
      <div
        className={isCover ? coverImageClassname : profileImageClassname}
        onMouseEnter={openHover}
        onMouseLeave={closeHover}
        onClick={() => (isUserAdmin ? openImageUpload() : closeImageUpload())}
      >
        {isCover && url?.includes("placeholder") ? (
          <h3 className="absolute text-5xl text-white lowercase -translate-x-1/2 -translate-y-1/2 md:uppercase left-1/2 font-cursive top-1/2">
            {isCover ? coverTitle ?? "" : ""}
          </h3>
        ) : (
          <LoadImage
            src={url}
            alt="Avatar"
            className={
              isCover
                ? "absolute object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 cursor-pointer md:uppercase left-1/2 top-1/2"
                : "object-cover w-full h-full rounded-full"
            }
          />
        )}
        {isHovered && isUserAdmin && (
          <div
            className={
              isCover
                ? "absolute w-full h-full cursor-pointer bg-gradient-to-t from-transparent to-gray-300"
                : "h-full -translate-y-full rounded-full cursor-pointer bg-gradient-to-b from-transparent to-slate-600"
            }
          >
            <FontAwesomeIcon
              icon={faCamera}
              className={`${
                isCover
                  ? " text-5xl text-slate-800 "
                  : " text-2xl text-slate-100 "
              } absolute  translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2 `}
            />
          </div>
        )}
      </div>
      {isImageUploadOpen && (
        <UploadProfileImage
          isImageUploadOpen={isImageUploadOpen}
          closeModal={closeImageUpload}
          title={
            isCover
              ? "Upload your cover image 📷 "
              : "Upload your profile picture 📷"
          }
          coverImageExist={isCover}
        />
      )}
    </>
  );
};

export default UserProfileImage;
