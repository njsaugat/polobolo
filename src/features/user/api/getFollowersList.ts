import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axios } from "../../../services/apiClient";

const getFollowersList = (followers: boolean) => {
  const { username } = useParams();
  const limit = 10;
  const getUserProfile = (pageParam: number) => {
    const params = { page: pageParam, limit };
    if (followers) {
      return axios.get(`/social-media/follow/list/followers/${username}`, {
        params: params,
      });
    }
    return axios.get(`/social-media/follow/list/following/${username}`, {
      params: params,
    });
  };
  return useInfiniteQuery({
    queryKey: [followers ? "followers" : "following", username],
    queryFn: ({ pageParam = 1 }) => getUserProfile(pageParam),
    getNextPageParam: (lastFollower, allFollowers) => {
      if (
        followers &&
        allFollowers.length * limit < lastFollower.data.totalFollowers
      ) {
        return allFollowers.length + 1;
      }
      if (
        !followers &&
        allFollowers.length * limit < lastFollower.data.totalFollowing
      ) {
        return allFollowers.length + 1;
      }
      return null;
    },
  });
};

export default getFollowersList;
