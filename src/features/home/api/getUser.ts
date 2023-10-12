import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { ResponseType } from "types/responseType";
import { Author } from "features/posts/types/postType";

const getUser = () => {
  const getUserProfile = () => {
    return axios.get<ResponseType<Author>>("/social-media/profile");
  };
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    staleTime: 60 * 60 * 1000,
  });
};

export default getUser;
