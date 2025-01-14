import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";

const Redirect = () => {
  const location = useLocation();

  useEffect(() => {
    let interval: number;
    const checkAuthWindow = (authWindow: Window) => {
      if (authWindow?.location.href) {
        const queryParams = new URLSearchParams(location.search);
        if (authWindow?.location.href.includes("error")) {
          const errorMessage = queryParams.get("error");
          if (errorMessage) {
            let confirmation = window.confirm(errorMessage);
            if (confirmation) {
              authWindow?.close();
            }
          }
        } else if (authWindow?.location.href.includes("accessToken")) {
          const accessToken = queryParams.get("accessToken");
          LocalStorage.set("accessToken", accessToken);
          authWindow?.close();
          authWindow.opener.location.reload(false);
        }
      }

      if (!authWindow?.closed) {
        interval = setInterval(checkAuthWindow, 1000); // Check again after a second
      }
    };

    checkAuthWindow(window);

    return () => clearInterval(interval);
  }, []);

  return <div> Redirecting </div>;
};

export default Redirect;
