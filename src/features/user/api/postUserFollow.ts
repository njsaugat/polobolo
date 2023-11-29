import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";
import store, { RootState } from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { useSelector } from "react-redux";
import { Author } from "features/posts/types/postType";
import { useTranslation } from "react-i18next";

const postFollow = (toBeFollowedUserId: string | undefined) => {
  const queryClient = useQueryClient();
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { t } = useTranslation();
  const postFollowData = () => {
    return axios.post(`/social-media/follow/${toBeFollowedUserId}`);
  };
  return useMutation({
    mutationFn: postFollowData,
    onError: () => {},
    onSuccess: (response) => {
      const { dispatch } = store;
      const { following } = response.data;
      queryClient.invalidateQueries(["following", user?.account.username]);
      queryClient.invalidateQueries(["user", user?.account.username]);
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: following
            ? t("notificationMessages.followUser")
            : t("notificationMessages.unfollowUser"),
        })
      );
    },
  });
};

export default postFollow;
