import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useParams } from "react-router-dom";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { handleUpdateProfilePic } from "../../../stores/userSlice";
import { useTranslation } from "react-i18next";

const postImage = (coverImageExist: boolean | undefined) => {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const { t } = useTranslation();
  const postImage = (formData: any) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (coverImageExist) {
      return axios.patch("/social-media/profile/cover-image", formData, config);
    }
    return axios.patch("/users/avatar", formData, config);
  };
  return useMutation({
    mutationFn: postImage,
    onError: () => {},
    onSuccess: (response) => {
      queryClient.invalidateQueries(["user", username]);
      const message = response?.message;
      const updatedPicURL = response?.data?.avatar?.url;
      const { dispatch } = store;
      if (!coverImageExist) {
        dispatch(handleUpdateProfilePic(updatedPicURL));
      }
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: coverImageExist
            ? t("notificationMessages.updateCoverImage")
            : t("notificationMessages.updateProfileImage"),
        })
      );
    },
  });
};

export default postImage;
