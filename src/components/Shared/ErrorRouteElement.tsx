import LoadImage from "../../components/Elements/LoadImage";
import useAuthCheck from "../../hooks/useAuthCheck";
import { Link, Navigate } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Logo from "./Logo";
import GradientText from "./GradientText";

const ErrorRouteElement = () => {
  const error = useRouteError();
  const isLoggedIn = useAuthCheck();
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center w-screen h-screen bg-gray-50 font-montserrat">
      <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
        <div className="w-full mx-8 lg:w-1/2">
          <GradientText content="404" />
          <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
            Sorry we couldn't find the page you're looking for
          </p>
          {/* <p className="text-base">{error.message}</p> */}

          <div
            id="error-page"
            className="flex flex-col items-center justify-center gap-8"
          >
            <p className="text-slate-400">
              <i>
                {isRouteErrorResponse(error)
                  ? error.error?.message || error.statusText
                  : "Unknown error message"}
              </i>
            </p>
            <Link to={"/"} className="underline">
              Return Home
            </Link>
          </div>
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
};

export default ErrorRouteElement;
