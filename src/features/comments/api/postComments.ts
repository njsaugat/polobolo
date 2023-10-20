import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentValidationSchema } from "../../posts/Components/PostEngagements";
import { axios } from "../../../services/apiClient";
import store, { RootState } from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import {
  Comments,
  Comment,
  Pagination,
  Posts,
} from "../../posts/types/postType";
import { ResponseType } from "types/responseType";
import { useContext } from "react";
import { PostRefetchContext } from "../../posts/context/PostContext";
import { nanoid } from "nanoid";
import { CommentRefetchContext } from "../../posts/context/CommentContext";
import { useSelector } from "react-redux";
import { Refetch } from "stores/refetchSlice";
import { UserContext } from "../../posts/context/UserContext";

const postComment = (postId: string, commentId?: string) => {
  const { page, refetch } = useContext(PostRefetchContext);
  // const { refetch: refetchComment } = useContext(CommentRefetchContext);
  const { user } = useContext(UserContext);
  const refetchComment = useSelector<RootState, Refetch>(
    (store) => store.refetch.refetch
  );

  const postUserComment = (comment: CommentValidationSchema) => {
    if (commentId) {
      return axios.patch(`/social-media/comments/${commentId}`, comment);
    }
    return axios.post(`/social-media/comments/post/${postId}`, comment);
  };
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserComment,
    onMutate: async (comment) => {
      let pageNumber = 0;
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousLikes = queryClient.getQueryData(["comments", postId]);

      if (commentId) {
        queryClient.setQueryData<
          InfiniteData<ResponseType<Comments & Pagination>>
        >(["comments", postId], (oldComments: any) => {
          if (!oldComments) return oldComments;
          const newComments = oldComments?.pages?.map(
            (page: ResponseType<Comments & Pagination>, pageIndex: number) => {
              return {
                ...page,
                data: {
                  ...page.data,
                  comments: page.data.comments.map((eachComment, index) => {
                    if (eachComment._id === commentId) {
                      pageNumber = pageIndex;
                      return {
                        ...eachComment,
                        content: comment.content,
                      };
                    }
                    return eachComment;
                  }),
                  // page.data.comments.push(),
                },
              };
            }
          );
          return {
            ...oldComments,
            pages: newComments,
          };
        });
      } else {
        queryClient.setQueryData<
          InfiniteData<ResponseType<Posts & Pagination>>
        >(["posts"], (oldPosts) => {
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
                        comments: post.comments + 1,
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
        });

        queryClient.setQueryData<
          InfiniteData<ResponseType<Comments & Pagination>>
        >(["comments", postId], (oldComments: any) => {
          if (!oldComments) return oldComments;
          const newComments = oldComments?.pages?.map(
            (page: ResponseType<Comments & Pagination>, pageIndex: number) => {
              return {
                ...page,
                data: {
                  ...page.data,
                  comments: pageIndex === 0 &&
                    user && [
                      {
                        _id: nanoid(),
                        content: comment.content,
                        postId: postId,
                        author: user,
                        __v: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        likes: 0,
                        isLiked: false,
                      },
                      ...page.data.comments,
                    ],
                  // page.data.comments.push(),
                },
              };
            }
          );
          return {
            ...oldComments,
            pages: newComments,
          };
        });
      }
      return { previousLikes, pageNumber };
    },
    onSuccess: (response, varaibles, context) => {
      const { dispatch } = store;
      // console.log
      const pageNumber = context?.pageNumber;

      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: commentId
            ? "Comment updated successfully."
            : "Comment created successfully.",
        })
      );
      refetchComment({
        refetchPage: (_: number, index: number) => {
          if (pageNumber) {
            return index === pageNumber;
          }
          return index === pageNumber;
        },
      });
      refetch({
        refetchPage: (_: number, index: number) => index === page - 1,
      });
    },
  });
};

export default postComment;
