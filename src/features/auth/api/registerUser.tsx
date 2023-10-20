import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface SignupData {
  email: string;
  password: string;
  role: string;
  username: string;
}
const useRegisterUser = () => {
  const navigate = useNavigate();
  const registerUser = (signupData: SignupData) => {
    return axios.post("/users/register", signupData);
  };
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/home");
    },
  });
};

export default useRegisterUser;
