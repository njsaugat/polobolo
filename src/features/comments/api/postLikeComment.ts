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
import { CommentRefetchContext } from "../../posts/context/CommentContext";
import { PostRefetchContext } from "../../posts/context/PostContext";
import { Comments, Pagination } from "../../posts/types/postType";

const postLikeComment = (commentId: string, isLiked: boolean) => {
  const { postId } = useContext(PostRefetchContext);
  const { refetch, page } = useContext(CommentRefetchContext);

  const postUserLikeComment = () => {
    return axios.post(`/social-media/like/comment/${commentId}`);
  };
  const queryClient = useQueryClient();
  const { t } = useTranslation();
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
      const { dispatch } = store;

      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: t("notificationMessages.likeComment"),
        })
      );
      refetch({
        refetchPage: (_: number, index: number) => index === page - 1,
      });
    },
  });
};

export default postLikeComment;
