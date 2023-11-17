import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";

const getComments = (postId: string, showComments: boolean) => {
  const queryClient = useQueryClient();
  const limit = 5;
  const getComments = (pageParam: number) => {
    const params = { page: pageParam, limit };
    return axios.get(`/social-media/comments/post/${postId}`, {
      params: params,
    });
  };
  const initialQueryKey = ["comments", postId];
  return useInfiniteQuery({
    queryKey: initialQueryKey,
    queryFn: ({ pageParam = 1 }) => getComments(pageParam),
    getNextPageParam: (lastPost, allComments) => {
      if (allComments.length * limit < lastPost.data.totalComments) {
        return allComments.length + 1;
      }
      return null;
    },
    enabled: showComments,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default getComments;
