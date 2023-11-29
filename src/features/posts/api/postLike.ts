import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { axios } from "../../../services/apiClient";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";
import { ResponseType } from "../../../types/responseType";
import { PostRefetchContext } from "../context/PostContext";
import { Pagination, Posts } from "../types/postType";
const postLike = (postId: string, isLiked: boolean) => {
  const { refetch, page } = useContext(PostRefetchContext);
  const postUserLike = () => {
    return axios.post(`/social-media/like/post/${postId}`);
  };
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: postUserLike,
    onMutate: async (pageParam) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousLikes = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData<InfiniteData<ResponseType<Posts & Pagination>>>(
        ["posts"],
        (oldPosts) => {
          if (!oldPosts) return oldPosts;
          const newPosts = oldPosts?.pages?.map(
            (page: ResponseType<Posts & Pagination>) => {
              return {
                ...page,
                data: {
                  ...page.data,
                  posts: page.data.posts.map((post) => {
                    if (post._id === postId) {
                      return {
                        ...post,
                        likes: isLiked ? post.likes - 1 : post.likes + 1,
                        isLiked: !isLiked,
                      };
                    }
                    return post;
                  }),
                },
              };
            }
          );
          return {
            ...oldPosts,
            pages: newPosts,
          };
        }
      );
      return { previousLikes };
    },
    onError: (err, newPost, context) => {
      if (!context) return;
      queryClient.setQueryData(["posts"], context.previousLikes);
    },
    onSuccess: (response) => {
      const { message } = response;
      const { dispatch } = store;

      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: t("notificationMessages.likePost"),
        })
      );
      refetch({
        refetchPage: (_: number, index: number) => index === page - 1,
      });
    },
  });
};

export default postLike;
