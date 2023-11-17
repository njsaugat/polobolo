import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";

const postBookmark = (postId: string | undefined) => {
  const queryClient = useQueryClient();
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
          title: "Success",
          message: response?.message,
        })
      );
    },
  });
};

export default postBookmark;
