import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "../utils/loginValidation";
import { LocalStorage } from "../../../utils/index";

const useLogoutUser = () => {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const logoutUser = () => {
    return axios.post("/users/logout");
  };
  return useMutation({
    mutationFn: logoutUser,
  });
};

export default useLogoutUser;
