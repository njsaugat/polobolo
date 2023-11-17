import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";

const deletePost = (postId: string | undefined) => {
  const queryClient = useQueryClient();
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
          title: "Success",
          message: "Post deleted successfully.",
        })
      );
    },
  });
};

export default deletePost;
