import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";

const getUserChat = () => {
  const queryClient = useQueryClient();
  const getUserChat = () => {
    return axios.get(`/chat-app/chats`);
  };
  return useQuery({
    queryKey: ["chats"],
    queryFn: getUserChat,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default getUserChat;
