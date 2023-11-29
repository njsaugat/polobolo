import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatUser } from "features/posts/types/postType";
import { ResponseType } from "types/responseType";
import { axios } from "../../../services/apiClient";

const getAllUsers = (showUsers: boolean) => {
  const queryClient = useQueryClient();
  const getAllUserData = () => {
    return axios.get<ResponseType<ChatUser[]>>(`/chat-app/chats/users`);
  };
  return useQuery({
    queryKey: ["chats", "users"],
    queryFn: getAllUserData,
    staleTime: 1000 * 60 * 60 * 24,
    enabled: showUsers,
  });
};

export default getAllUsers;
