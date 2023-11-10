import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";

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
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: `User profile created successfully. Please Login.`,
        })
      );
      navigate("/login");
    },
  });
};

export default useRegisterUser;
