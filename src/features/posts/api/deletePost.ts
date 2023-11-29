import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { axios } from "../../../services/apiClient";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";

const deletePost = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const deleteData = () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.delete(`/social-media/posts/${postId}`, config);
  };
  return useMutation({
    mutationFn: deleteData,
    onError: () => {},
    onSuccess: (response) => {
      queryClient.invalidateQueries(["posts"]);
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: t("notificationMessages.deletePost"),
        })
      );
    },
  });
};

export default deletePost;
