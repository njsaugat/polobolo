import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "features/posts/types/postType";

const useAuthCheck = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   const accessToken = LocalStorage.get("accessToken");

  //   if (accessToken) {
  //     setIsLoggedIn(true);
  //     //   navigate("/home");
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);
  // return isLoggedIn;
  // const accessToken = LocalStorage.get("accessToken");
  const isLoggedIn = useSelector<RootState, boolean>(
    (store) => store.user.isLoggedIn
  );
  const accessToken = LocalStorage.get("accessToken");

  if (isLoggedIn || accessToken) {
    return true;
  }
  return false;
};

export default useAuthCheck;
