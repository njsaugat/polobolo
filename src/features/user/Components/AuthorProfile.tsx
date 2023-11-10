import React from "react";
import { Link } from "react-router-dom";
import LoadImage from "../../../components/Elements/LoadImage";

type AuthorProfileProps = {
  username: string;
  url: string;
  firstName: string;
  lastName: string;
  bio: string;
  className?: string;
  closeModal?: () => void;
  isChat?: boolean;
  createChat?: () => void;
  isGroupChat?: boolean;
};
const AuthorProfile = ({
  username,
  url,
  firstName,
  lastName,
  bio,
  className,
  closeModal,
  isChat,
  createChat,
  isGroupChat,
}: AuthorProfileProps) => {
  return !isChat && !isGroupChat ? (
    <Link
      to={`${`/user/${username}`}`}
      onClick={() => {
        closeModal && closeModal();
        createChat && createChat();
      }}
      // className={`${isChat && "border w-full"}`}
    >
      <AuthorProfileChildren
        firstName={firstName}
        lastName={lastName}
        url={url}
        bio={bio}
        className={className}
        username={username}
      />
    </Link>
  ) : (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        closeModal && closeModal();
        createChat && createChat();
      }}
    >
      <AuthorProfileChildren
        firstName={firstName}
        lastName={lastName}
        url={url}
        bio={bio}
        className={className}
        username={username}
      />
    </div>
  );
};

const AuthorProfileChildren = ({
  className,
  url,
  firstName,
  lastName,
  bio,
}: AuthorProfileProps) => (
  <div className={`flex items-center w-auto space-x-4  ${className} `}>
    <LoadImage
      src={url}
      alt="Author Avatar"
      className="w-12 h-12 rounded-full"
    />
    <div>
      <h2 className={`${className ? "text-sm" : "text-lg"} `}>
        {firstName} {lastName}
      </h2>
      <p className="text-gray-500">{bio}</p>
    </div>
  </div>
);
export default AuthorProfile;
