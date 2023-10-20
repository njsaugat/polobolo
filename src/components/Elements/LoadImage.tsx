import React, { useState } from "react";

const LoadImage = ({
  className,
  src,
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [loading, setLoading] = useState(true);
  return (
    <img
      src={src}
      alt={` Avatar`}
      onLoad={() => setLoading(false)}
      className={`${
        loading ? " bg-gradient-to-r from-slate-200 to-gray-200  animate-pulse " : " bg-white"
      } ${className}`}
    />
  );
};

export default LoadImage;
