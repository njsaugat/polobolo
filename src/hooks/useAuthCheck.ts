import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "features/posts/types/postType";
import { QueryClient } from "@tanstack/react-query";

const useAuthCheck = () => {
  let isLoggedIn;
  const queryClient = new QueryClient();
  const user = queryClient.getQueryData(["user"]);
  console.log(user);
  if (user) {
    isLoggedIn = true;
    console.log("here logged in");
  } else {
    isLoggedIn = useSelector<RootState, boolean>(
      (store) => store.user.isLoggedIn
    );
  }
  const accessToken = LocalStorage.get("accessToken");
  if (isLoggedIn || accessToken) {
    return true;
  }
  return false;
};

export default useAuthCheck;
