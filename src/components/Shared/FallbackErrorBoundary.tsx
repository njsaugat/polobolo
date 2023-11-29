import { Link } from "react-router-dom";
import { Button } from "../../components/Elements/Button";
import LoadImage from "../../components/Elements/LoadImage";
import GradientText from "./GradientText";

type FallbackErrorBoundaryProps = {
  error: Error;
  resetErrorBoundary: () => void;
};
export function FallbackErrorBoundary({
  error,
  resetErrorBoundary,
}: FallbackErrorBoundaryProps) {
  return (
    <div className="flex items-center w-screen h-full bg-gray-50">
      <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
        <div className="w-full mx-8 lg:w-1/2">
          <GradientText content="404" />
          <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
            Sorry we couldn't find the page you're looking for
          </p>
          <p className="text-base">{error.message}</p>

          <Button
            onClick={resetErrorBoundary}
            className="inline px-5 py-3 my-2 font-medium leading-5 border-0 rounded-lg shadow-2xl duration-400 focus:outline-none"
          >
            Try again
          </Button>
          <Link to={"/"}>
            <Button
              onClick={resetErrorBoundary}
              className="inline px-5 py-3 font-medium leading-5 border-0 rounded-lg shadow-2xl duration-400 focus:outline-none"
            >
              Go home
            </Button>
          </Link>
        </div>
        <div className="w-full mx-5 my-12 lg:flex lg:justify-end lg:w-1/2">
          <LoadImage
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            className=""
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
}
