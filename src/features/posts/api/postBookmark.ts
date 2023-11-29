import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { useTranslation } from "react-i18next";

const postBookmark = (postId: string | undefined) => {
  const { t } = useTranslation();
  const postData = () => {
    return axios.post(`/social-media/bookmarks/${postId}`);
  };
  return useMutation({
    mutationFn: postData,
    onError: () => {},
    onSuccess: (response) => {
      const { dispatch } = store;

      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: t("notificationMessages.bookmarkPost"),
        })
      );
    },
  });
};

export default postBookmark;
