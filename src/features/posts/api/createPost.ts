import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";

const createPost = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  const postData = (formData: any) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);
    if (postId) {
      return axios.patch(`/social-media/posts/${postId}`, formData, config);
    }
    return axios.post("/social-media/posts", formData, config);
  };
  return useMutation({
    // mutationKey: ["user"],
    mutationFn: postData,
    onError: () => {},
    onSuccess: (response) => {
      queryClient.invalidateQueries(["posts"]);
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: postId
            ? "Post updated successfully."
            : "Post created successfully.",
        })
      );
      console.log(response);
    },
  });
};

export default createPost;
