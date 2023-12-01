import { useQuery } from "@tanstack/react-query";
import { Author } from "features/posts/types/postType";
import { ResponseType } from "types/responseType";
import { axios } from "../../../services/apiClient";

const getUser = () => {
  const getUserProfile = () => {
    return axios.get<ResponseType<Author>>("/social-media/profile");
  };
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    useErrorBoundary: true,
    staleTime: 60 * 60 * 1000,
  });
};

export default getUser;
