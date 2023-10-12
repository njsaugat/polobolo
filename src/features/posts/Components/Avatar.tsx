import React, { useState } from "react";
type AvatarProps = {
  url?: string;
  firstName?: string;
  className?: string;
};
const Avatar = ({ url, firstName, className }: AvatarProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <img
        src={url}
        alt={`${firstName}'s Avatar`}
        onLoad={() => setLoading(false)}
        className={`${
          loading && "bg-slate-300 animate-pulse "
        }w-10 h-10   border mr-2 rounded-full ${className}`}
      />
    </>
  );
};

export default Avatar;
