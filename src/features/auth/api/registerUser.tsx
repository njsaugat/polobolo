import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { useTranslation } from "react-i18next";

export interface SignupData {
  email: string;
  password: string;
  role: string;
  username: string;
}
const useRegisterUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
          title: t("notification.success"),
          message: t("notificationMessages.signupUser"),
        })
      );
      navigate("/login");
    },
  });
};

export default useRegisterUser;
