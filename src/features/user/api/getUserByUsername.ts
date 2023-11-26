import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { ResponseType } from "types/responseType";
import { Author, UserProfile } from ".../../features/posts/types/postType";

const getUserByUsername = (userName: string | undefined) => {
  const getUserProfile = () => {
    return axios.get<ResponseType<UserProfile>>(
      `/social-media/profile/u/${userName}`
    );
  };
  return useQuery({
    queryKey: ["user", userName],
    queryFn: getUserProfile,
    useErrorBoundary: true,
    staleTime: 60 * 60 * 24 * 1000,
  });
};

export default getUserByUsername;
