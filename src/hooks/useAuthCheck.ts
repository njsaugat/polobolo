import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils";

const useAuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = LocalStorage.get("accessToken");

    if (accessToken) {
      setIsLoggedIn(true);
      //   navigate("/home");
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return isLoggedIn;
};

export default useAuthCheck;
