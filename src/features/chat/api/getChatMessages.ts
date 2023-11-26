import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { JOIN_CHAT_EVENT } from "../../../config/constants";
import { useSocket } from "../../../context/SocketContext";

const getChatMessages = (chatId: string | undefined) => {
  const { socket } = useSocket();
  const getUserChatMessages = () => {
    return axios.get(`/chat-app/messages/${chatId}`);
  };
  return useQuery({
    queryKey: ["chats", "messages", chatId],
    useErrorBoundary: true,
    queryFn: getUserChatMessages,
    staleTime: 1000 * 60 * 60,
    onSuccess: (data) => {
      socket?.emit(JOIN_CHAT_EVENT, chatId);
    },
  });
};

export default getChatMessages;
