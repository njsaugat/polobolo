import { useInfiniteQuery } from "@tanstack/react-query";
import { ResponseType } from "types/responseType";
import { axios } from "../../../services/apiClient";
import { Pagination, Posts } from "../types/postType";

const getPosts = (
  username: string | undefined,
  tag: string | undefined = undefined,
  bookmarks: boolean | undefined = undefined
) => {
  let limit: number;
  if (tag) {
    limit = 3;
  } else {
    limit = 10;
  }
  const getPosts = (pageParam: number) => {
    const params = { page: pageParam, limit };
    if (tag) {
      return axios.get<ResponseType<Posts & Pagination>>(
        `/social-media/posts/get/t/${tag}`,
        {
          params: params,
        }
      );
    }

    if (bookmarks) {
      return axios.get<ResponseType<Posts & Pagination>>(
        `/social-media/bookmarks`,
        {
          params: params,
        }
      );
    }
    if (username) {
      return axios.get<ResponseType<Posts & Pagination>>(
        `/social-media/posts/get/u/${username}`,
        {
          params: params,
        }
      );
    }

    return axios.get<ResponseType<Posts & Pagination>>("/social-media/posts", {
      params: params,
    });
  };
  const getQueryKey = () => {
    if (bookmarks) {
      return ["posts", username, "bookmarks"];
    } else if (username) {
      return ["posts", username];
    } else if (tag) {
      return ["posts", tag];
    }
    return ["posts"];
  };
  return useInfiniteQuery({
    queryKey: getQueryKey(),
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
