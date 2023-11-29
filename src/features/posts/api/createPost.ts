import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useParams } from "react-router-dom";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { useTranslation } from "react-i18next";

const createPost = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const { t } = useTranslation();
  const postData = (formData: any) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (postId) {
      return axios.patch(`/social-media/posts/${postId}`, formData, config);
    }
    return axios.post("/social-media/posts", formData, config);
  };
  return useMutation({
    mutationFn: postData,
    onError: () => {},
    onSuccess: (response) => {
      if (username) {
        queryClient.invalidateQueries(["posts", username]);
      } else {
        queryClient.invalidateQueries(["posts"]);
      }
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: postId
            ? t("notificationMessages.updatePost")
            : t("notificationMessages.createPost"),
        })
      );
    },
  });
};

export default createPost;
