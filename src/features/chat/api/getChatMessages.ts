import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { Chat } from "features/posts/types/postType";
import { ResponseType } from "types/responseType";
import { JOIN_CHAT_EVENT } from "../components/ChatSection";
import { useSocket } from "../../../context/SocketContext";

const getChatMessages = (chatId: string | undefined) => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const getUserChatMessages = () => {
    return axios.get(`/chat-app/messages/${chatId}`);
  };
  return useQuery({
    queryKey: ["chats", "messages", chatId],
    queryFn: getUserChatMessages,
    staleTime: 1000 * 60 * 60,
    onSuccess: (data) => {
      socket?.emit(JOIN_CHAT_EVENT, chatId);

      // if (data) {
      //   data.data.reverse(); // Reverse the chat messages array
      // }
    },
  });
};

export default getChatMessages;
