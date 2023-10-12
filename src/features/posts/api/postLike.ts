import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { Pagination, Post, PostCardProps, Posts } from "../types/postType";
import { useContext } from "react";
import { PostRefetchContext } from "../context/PostContext";
import { ResponseType } from "../../../types/responseType";
const postLike = (postId: string, isLiked: boolean) => {
  const { refetch, page } = useContext(PostRefetchContext);
  const postUserLike = () => {
    return axios.post(`/social-media/like/post/${postId}`);
  };
  const queryClient = useQueryClient();
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
      console.log(response);
      const { message } = response;
      console.log("message-->", message);
      const { dispatch } = store;

      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: `Post ${message}`,
        })
      );
      console.log(message);
      refetch({
        refetchPage: (_: number, index: number) => index === page - 1,
      });
    },
  });
};

export default postLike;
