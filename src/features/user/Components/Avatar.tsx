import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadImage from "../../../components/Elements/LoadImage";
type AvatarProps = {
  url?: string;
  firstName?: string;
  className?: string;
  username?: string;
};
const Avatar = ({ url, firstName, className, username }: AvatarProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <Link to={`/user/${username}`}>
      <LoadImage
        src={url}
        alt={`${firstName}'s Avatar`}
        className="w-10 h-10 mr-2 border rounded-full"
      />
    </Link>
  );
};

export default Avatar;
