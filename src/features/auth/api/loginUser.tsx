import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "../utils/loginValidation";
import { LocalStorage } from "../../../utils/index";
import { onboardingThresholdSeconds as thresholdSeconds } from "../../../config/constants";
import {
  handleEmailVerification,
  handleInitialLogin,
  handleLoginUser,
} from "../../../stores/userSlice";
import store, { RootState } from "../../../stores/store";
import useAuthCheck from "../../../hooks/useAuthCheck";
import { addNotification } from "../../../stores/notificationSlice";
/*  */
const isUserInitialLogin = (createdAt: string, updatedAt: string) => {
  let createdAtDate = new Date(createdAt).valueOf();
  let updatedAtDate = new Date(updatedAt).valueOf();
  const timeDifference = (updatedAtDate - createdAtDate) / 1000;
  const isInitialLogin = timeDifference <= thresholdSeconds;
  return isInitialLogin;
};
const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLoggedIn = useAuthCheck();
  const loginUser = (loginData: LoginValidationSchema) => {
    return axios.post("/users/login", loginData);
  };
  return useMutation({
    // mutationKey: ["user"],
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
          dispatch(
            addNotification({
              type: "success",
              title: "Success",
              message: "Please update your profile.",
            })
          );
        }
        if (!isEmailVerified) {
          setTimeout(() => {
            dispatch(
              addNotification({
                type: "info",
                title: "Caution",
                message: "Please verify your email address.",
              })
            );
          }, 1000);
          // return navigate("/onboarding");
        }
        // setTimeout(() => {
        //   if (!isEmailVerified) {
        //     dispatch(
        //       addNotification({
        //         type: "info",
        //         title: "Caution",
        //         message: "Verify your email address or modify it here. 🔒",
        //       })
        //     );
        //     return navigate("/onboarding");
        //   } else {
        //     navigate("/home");
        //   }
        // }, 500);
      }
    },
  });
};

export default useLoginUser;
