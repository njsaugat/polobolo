import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "../utils/loginValidation";
import { LocalStorage } from "../../../utils/index";

const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginUser = (loginData: LoginValidationSchema) => {
    return axios.post("/users/login", loginData);
  };
  return useMutation({
    // mutationKey: ["user"],
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { accessToken } = response.data;
      LocalStorage.set("accessToken", accessToken);

      queryClient.setQueryData(["auth-user"], response.data.user);

      navigate("/home");
    },
  });
};

export default useLoginUser;
