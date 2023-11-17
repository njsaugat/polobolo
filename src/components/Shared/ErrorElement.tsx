import { Link } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-screen gap-8"
    >
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
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
  );
};

export default ErrorElement;
