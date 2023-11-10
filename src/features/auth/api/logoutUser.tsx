import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import store from "../../../stores/store";
import { handleLogoutUser } from "../../../stores/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
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
        const { dispatch } = store;
        dispatch(handleLogoutUser());
        // setTimeout(() => {
        //   navigate("/");
        // }, 500);
        setTimeout(() => {
          <Navigate to={"/"} />;
        }, 500);
      }
    },
  });
};

export default useLogoutUser;
