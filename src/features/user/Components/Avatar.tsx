import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadImage from "../../../components/Elements/LoadImage";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { Author } from "features/posts/types/postType";
type AvatarProps = {
  url?: string;
  firstName?: string;
  className?: string;
  username?: string;
};
const Avatar = ({ url, firstName, className, username }: AvatarProps) => {
  const updatedProfilePicURL = useSelector<RootState, string | undefined>(
    (store) => store.user.updatedProfilePicURL
  );
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  return (
    <Link to={`/user/${username}`}>
      <LoadImage
        src={
          updatedProfilePicURL && user?.account.username === username
            ? updatedProfilePicURL
            : url
        }
        alt={`${firstName}'s Avatar`}
        className={`${
          className ? className : "w-10 h-10 mr-2 border rounded-full"
        } `}
      />
    </Link>
  );
};

export default Avatar;
