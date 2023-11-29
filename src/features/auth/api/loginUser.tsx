import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { onboardingThresholdSeconds as thresholdSeconds } from "../../../config/constants";
import { axios } from "../../../services/apiClient";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";
import {
  handleEmailVerification,
  handleInitialLogin,
  handleLoginUser,
} from "../../../stores/userSlice";
import { LocalStorage } from "../../../utils/index";
import { LoginValidationSchema } from "../utils/loginValidation";
const isUserInitialLogin = (createdAt: string, updatedAt: string) => {
  let createdAtDate = new Date(createdAt).valueOf();
  let updatedAtDate = new Date(updatedAt).valueOf();
  const timeDifference = (updatedAtDate - createdAtDate) / 1000;
  const isInitialLogin = timeDifference <= thresholdSeconds;
  return isInitialLogin;
};
const useLoginUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const loginUser = (loginData: LoginValidationSchema) => {
    return axios.post("/users/login", loginData);
  };
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { accessToken } = response.data;
      let { isEmailVerified, createdAt, updatedAt } = response.data.user;
      LocalStorage.set("accessToken", accessToken);
      queryClient.setQueryData(["auth-user"], response.data.user);
      const isInitialLogin = isUserInitialLogin(createdAt, updatedAt);

      if (accessToken) {
        const { dispatch } = store;
        dispatch(handleLoginUser());
        dispatch(handleEmailVerification(isEmailVerified));
        dispatch(handleInitialLogin(isInitialLogin));

        if (isInitialLogin) {
          navigate("/onboarding");
          dispatch(
            addNotification({
              type: "success",
              title: t("notification.success"),
              message: t("notificationMessages.updateProfile"),
            })
          );
        } else {
          navigate("/home");
        }
        if (!isEmailVerified) {
          setTimeout(() => {
            dispatch(
              addNotification({
                type: "info",
                title: t("notification.caution"),
                message: t("notificationMessages.verifyEmail"),
              })
            );
          }, 1000);
        }
      }
    },
  });
};

export default useLoginUser;
