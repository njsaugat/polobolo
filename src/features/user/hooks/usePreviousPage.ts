import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";

const usePreviousPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const popStateHandler = (event: PopStateEvent) => {
      const currentLocation = (event.target as Window)?.location.pathname;
      if (
        (currentLocation.includes("/login") &&
          LocalStorage.get("accessToken")) ||
        currentLocation.includes("/signup")
      ) {
        navigate("/home");
      }
      if (LocalStorage.get("accessToken")) {
        navigate("/login");
      }
    };
    window.addEventListener("popstate", popStateHandler, false);

    return () => window.removeEventListener("popstate", popStateHandler);
  }, []);
};

export default usePreviousPage;
