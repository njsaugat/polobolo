import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { ResponseType } from "../../../types/responseType";
import { Comments, Pagination } from "../../posts/types/postType";
import { useContext } from "react";
import { PostRefetchContext } from "../../posts/context/PostContext";
import { CommentRefetchContext } from "../../posts/context/CommentContext";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";

const postLikeComment = (commentId: string, isLiked: boolean) => {
  const { postId } = useContext(PostRefetchContext);
  const { refetch, page } = useContext(CommentRefetchContext);

  const postUserLikeComment = () => {
    return axios.post(`/social-media/like/comment/${commentId}`);
  };
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserLikeComment,
    onMutate: async (pageParam) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousLikes = queryClient.getQueryData(["comments", postId]);
      queryClient.setQueryData<
        InfiniteData<ResponseType<Comments & Pagination>>
      >(["comments", postId], (oldComments) => {
        if (!oldComments) return oldComments;
        const newComments = oldComments?.pages?.map(
          (page: ResponseType<Comments & Pagination>) => {
            return {
              ...page,
              data: {
                ...page.data,
                comments: page.data.comments.map((comment) => {
                  if (comment._id === commentId) {
                    return {
                      ...comment,
                      likes: isLiked ? comment.likes - 1 : comment.likes + 1,
                      isLiked: !isLiked,
                    };
                  }
                  return comment;
                }),
              },
            };
          }
        );
        return {
          ...oldComments,
          pages: newComments,
        };
      });
      return { previousLikes };
    },
    onError: (err, newPost, context) => {
      if (!context) return;
      queryClient.setQueryData(["comments", postId], context.previousLikes);
    },
    onSuccess: (response) => {
      const { message } = response;
      const { dispatch } = store;

      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: `Comment ${message}`,
        })
      );
      refetch({
        refetchPage: (_: number, index: number) => index === page - 1,
      });
    },
  });
};

export default postLikeComment;
