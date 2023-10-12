import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "../utils/loginValidation";
import { LocalStorage } from "../../../utils/index";

const useLogoutUser = () => {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const logoutUser = () => {
    // console.log(loginData);
    return axios.post("/users/logout");
  };
  return useMutation({
    // mutationKey: ["user"],
    mutationFn: logoutUser,
    // onSuccess: (response) => {
    //   const { accessToken } = response.data;
    //   LocalStorage.set("accessToken", accessToken);

    //   queryClient.setQueryData(["auth-user"], response.data.user);

    //   console.log(response);
    //   navigate("/home");
    // },
  });
};

export default useLogoutUser;
