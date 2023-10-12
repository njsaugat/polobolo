import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";

const getPosts = () => {
  const limit = 10;
  const getPosts = (pageParam: number) => {
    const params = { page: pageParam, limit };
    return axios.get("/social-media/posts", { params: params });
  };
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPost, allPosts) => {
      if (allPosts.length * limit < lastPost.data.totalPosts) {
        // console.log("------------------->", allPosts.length * limit);

        return allPosts.length + 1;
      }
      return null;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default getPosts;
