import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Comments, Pagination } from "../../../features/posts/types/postType";
import { axios } from "../../../services/apiClient";
import { ResponseType } from "../../../types/responseType";

const getComments = (postId: string, showComments: boolean) => {
  const queryClient = useQueryClient();
  const limit = 5;
  const getComments = (pageParam: number) => {
    const params = { page: pageParam, limit };
    return axios.get<ResponseType<Comments & Pagination>>(
      `/social-media/comments/post/${postId}`,
      {
        params: params,
      }
    );
  };
  const initialQueryKey = ["comments", postId];
  return useInfiniteQuery({
    queryKey: initialQueryKey,
    queryFn: ({ pageParam = 1 }) => getComments(pageParam),
    getNextPageParam: (lastComment, allComments) => {
      if (
        allComments.length * limit <
        (lastComment?.data?.totalComments ?? 0)
      ) {
        return allComments.length + 1;
      }
      return null;
    },
    enabled: showComments,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default getComments;
