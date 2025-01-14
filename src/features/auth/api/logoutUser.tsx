import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../services/apiClient";
import store from "../../../stores/store";
import { handleLogoutUser, removeUser } from "../../../stores/userSlice";
import { LocalStorage } from "../../../utils";

const useLogoutUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutUser = () => {
    return axios.post("/users/logout");
  };
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      const statusCode = response.statusCode;
      if (statusCode === 200) {
        LocalStorage.remove("accessToken");
        queryClient.removeQueries(["auth-user"]);
        queryClient.removeQueries(["user"]);
        const { dispatch } = store;
        dispatch(handleLogoutUser());
        dispatch(removeUser(undefined));
        navigate("/login");
      }
    },
  });
};

export default useLogoutUser;
