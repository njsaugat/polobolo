import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import store, { RootState } from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { Comments, Pagination, Posts } from "../../posts/types/postType";
import { ResponseType } from "types/responseType";
import { useSelector } from "react-redux";
import { Refetch } from "stores/refetchSlice";
import { useContext } from "react";
import { PostRefetchContext } from "../../posts/context/PostContext";

const deleteComment = (commentId: string | undefined, postId: string) => {
  const queryClient = useQueryClient();
  const { page, refetch } = useContext(PostRefetchContext);
  const refetchComment = useSelector<RootState, Refetch>(
    (store) => store.refetch.refetch
  );

  const deleteData = () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.delete(`/social-media/comments/${commentId}`, config);
  };

  return useMutation({
    mutationFn: deleteData,
    onMutate: async () => {
      let pageNumber = 0;
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

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
                        comments: post.comments - 1,
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
                comments: page.data.comments.filter((eachComment, index) => {
                  if (eachComment._id !== commentId) {
                    pageNumber = pageIndex;
                    return eachComment;
                  }
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
      return { pageNumber };
    },
    onError: () => {},
    onSuccess: (response, varaibles, context) => {
      const pageNumber = context?.pageNumber;

      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: "Comment deleted successfully.",
        })
      );
      refetch({
        refetchPage: (_: number, index: number) => index === page - 1,
      });
      refetchComment({
        refetchPage: (_: number, index: number) => {
          if (pageNumber) {
            return index === pageNumber;
          }
          return index === pageNumber;
        },
      });
    },
  });
};

export default deleteComment;
