import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

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
  const handleClick = () => {
    closeModal && closeModal();
    createChat && createChat();
  };

  const commonContent = (
    <div>
      <h2 className={`${className ? "text-sm" : "text-lg"}`}>
        {firstName} {lastName}
      </h2>
      <p className="text-gray-500">{bio}</p>
    </div>
  );

  return (
    <div
      className={`w-full cursor-pointer ${
        isChat || isGroupChat ? "" : "hover:underline"
      }`}
      onClick={handleClick}
    >
      <div className={`flex items-center w-auto space-x-4 ${className}`}>
        <Avatar
          url={url}
          className="w-12 h-12 rounded-full"
          username={username}
          firstName={firstName}
        />

        {isChat || isGroupChat ? (
          commonContent
        ) : (
          <Link to={`/user/${username}`} onClick={handleClick}>
            {commonContent}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
