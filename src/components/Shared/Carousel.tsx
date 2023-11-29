import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../components/Elements/Button";
import {
  Avatar
} from "../../features/posts/types/postType";
import LoadImage from "../Elements/LoadImage";

type CarouselProps = {
  images: Avatar[];
  currentIndex: number;
  prevSlide: () => void;
  nextSlide: () => void;
};
const Carousel = ({
  images,
  currentIndex,
  prevSlide,
  nextSlide,
}: CarouselProps) => {
  return (
    <div className="relative self-start overflow-hidden lg:w-4/6">
      <div className="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={image._id}
              className={`carousel-slide h-[24rem] md:h-[36rem] lg:h-[54rem] transition-all duration-200  ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <LoadImage
                src={image.url}
                alt={`Image ${index + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="absolute left-0 w-10 h-10 p-2 text-2xl text-black transition-all transform -translate-y-1/2 border-0 rounded-full shadow-2xl top-1/2"
        onClick={prevSlide}
        size="xs"
      >
        <FontAwesomeIcon icon={faAngleLeft} className="text-xl" />
      </Button>
      <Button
        className="absolute right-0 w-10 h-10 p-2 text-2xl text-black transition-all -translate-y-1/2 border-0 rounded-full top-1/2"
        onClick={nextSlide}
        size="xs"
      >
        <FontAwesomeIcon icon={faAngleRight} className="text-xl" />
      </Button>
    </div>
  );
};

export default Carousel;
