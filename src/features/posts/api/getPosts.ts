import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";

const getPosts = (username: string | undefined) => {
  const limit = 10;
  const getPosts = (pageParam: number) => {
    const params = { page: pageParam, limit };

    if (username) {
      return axios.get(`/social-media/posts/get/u/${username}`, {
        params: params,
      });
    }
    return axios.get("/social-media/posts", { params: params });
  };
  return useInfiniteQuery({
    queryKey: username ? ["posts", username] : ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPost, allPosts) => {
      if (allPosts.length * limit < lastPost.data.totalPosts) {
        return allPosts.length + 1;
      }
      return null;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default getPosts;
