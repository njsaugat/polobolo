import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { addUser, removeUser } from "../../../stores/userSlice";
import { useTranslation } from "react-i18next";

const updateProfile = (isOnboarding: boolean = false) => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const username = pathname.split("/")[2];
  const postData = (profileData: any) => {
    return axios.patch(`/social-media/profile`, profileData);
  };

  return useMutation({
    mutationFn: postData,
    onError: () => {},
    onSuccess: (response) => {
      const user = response?.data;
      queryClient.invalidateQueries(["user", username]);
      const { dispatch } = store;
      dispatch(removeUser());
      dispatch(addUser(user));
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: isOnboarding
            ? t("notificationMessages.createdProfile")
            : t("notificationMessages.updatedProfile"),
        })
      );
      if (isOnboarding) {
        navigate(`/home`);
      } else {
        navigate(`/user/${username}/about`);
      }
    },
  });
};

export default updateProfile;
