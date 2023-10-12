import React from "react";
import { PostCardProp, PostCardProps } from "../types/postType";

type CarouselProps = {
  currentIndex: number;
  prevSlide: () => void;
  nextSlide: () => void;
};
const Carousel = ({
  post,
  currentIndex,
  prevSlide,
  nextSlide,
}: PostCardProp & CarouselProps) => {
  return (
    <div className="relative self-start overflow-hidden lg:w-4/6">
      <div className="carousel">
        <div className="carousel-inner">
          {post.images.map((image, index) => (
            <div
              // key={index}
              key={image._id}
              className={`carousel-slide h-[24rem] md:h-[36rem] lg:h-[54rem]  ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-0 w-10 h-10 p-2 text-white transition-all transform -translate-y-1/2 bg-gray-500 rounded-full opacity-75 hover:opacity-100 top-1/2"
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <button
        className="absolute right-0 w-10 h-10 p-2 text-white transition-all -translate-y-1/2 bg-gray-500 rounded-full opacity-75 hover:opacity-100 top-1/2"
        onClick={nextSlide}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
