import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { ResponseType } from "../../../types/responseType";
import { Chat, ChatMessage } from "../../../features/posts/types/postType";

export const deleteOneToOneChat = (
  queryClient: QueryClient,
  chatId: string
) => {
  queryClient.setQueryData<ResponseType<Chat[]>>(["chats"], (oldChats) => {
    if (!oldChats) return oldChats;
    return {
      ...oldChats,
      data: oldChats.data.filter((chat) => chat._id !== chatId),
    };
  });
};

const deleteChat = () => {
  const queryClient = useQueryClient();
  const deleteChatData = ({
    chatId,
    isGroup,
    isLeave,
  }: {
    chatId: string;
    isGroup: boolean;
    isLeave?: boolean;
  }) => {
    if (isGroup) {
      if (isLeave) {
        return axios.delete<ResponseType<ChatMessage>>(
          `/chat-app/chats/leave/group/${chatId}`
        );
      }
      return axios.delete<ResponseType<{}>>(`/chat-app/chats/group/${chatId}`);
    }
    return axios.delete<ResponseType<{}>>(`/chat-app/chats/remove/${chatId}`);
  };
  return useMutation({
    mutationFn: deleteChatData,
    onMutate: (variables) => {
      const previousChats = queryClient.getQueryData(["chats"]);

      deleteOneToOneChat(queryClient, variables.chatId);
      return { previousChats };
    },
    onError: (err, newPost, context) => {
      if (!context) return;
      queryClient.setQueryData(["chats"], context.previousChats);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["chats"]);
      const { dispatch } = store;
      const navigate = useNavigate();
      navigate(".");
      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: "User chat deleted successfully.",
        })
      );
    },
  });
};

export default deleteChat;
