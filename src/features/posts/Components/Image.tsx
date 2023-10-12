import React from "react";
interface Image {
  _id: string;
  localPath: string;
  url: string;
}

interface ImageProps {
  image: Image;
}
const Image = ({ image }: ImageProps) => {
  return (
    <div className="w-full h-32 overflow-hidden rounded-lg">
      <img
        key={image._id}
        src={image.url}
        alt="Post Image"
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform rounded-lg hover:scale-110 hover:rounded-lg "
      />
    </div>
  );
};

export default Image;
