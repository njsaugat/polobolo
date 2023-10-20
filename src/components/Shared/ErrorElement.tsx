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
            ? // note that error is type `ErrorResponse`
              error.error?.message || error.statusText
            : "Unknown error message"}
        </i>
      </p>
    </div>
  );
};

export default ErrorElement;
