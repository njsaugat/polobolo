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
};
const AuthorProfile = ({
  username,
  url,
  firstName,
  lastName,
  bio,
  className,
}: AuthorProfileProps) => {
  return (
    <>
      <Link to={`/user/${username}`}>
        <div className={`flex items-center w-auto space-x-4  ${className} `}>
          <LoadImage
            src={url}
            alt="Author Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2
              className={`${className ? "text-sm" : "text-lg"} font-semibold`}
            >
              {firstName} {lastName}
            </h2>
            <p className="text-gray-500">{bio}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AuthorProfile;
