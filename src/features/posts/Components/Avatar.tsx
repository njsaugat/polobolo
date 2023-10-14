import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <img
        src={url}
        alt={`${firstName}'s Avatar`}
        onLoad={() => setLoading(false)}
        className={`${
          loading && "bg-slate-300 animate-pulse "
        }w-10 h-10   border mr-2 rounded-full ${className}`}
      />
    </Link>
  );
};

export default Avatar;
