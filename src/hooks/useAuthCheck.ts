import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "features/posts/types/postType";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const useAuthCheck = () => {
  const user = queryClient.getQueryData(["user"]);
  const userData = useSelector<RootState, boolean>(
    (store) => store.user.isLoggedIn
  );
  const accessToken: string = LocalStorage.get("accessToken");

  return userData || !!accessToken;
};

export default useAuthCheck;
