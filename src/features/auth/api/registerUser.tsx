import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../services/apiClient";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";

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
