import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Chat, ChatMessage } from "../../../features/posts/types/postType";
import { axios } from "../../../services/apiClient";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";
import { ResponseType } from "../../../types/responseType";

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
  const { t } = useTranslation();
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
          title: t("notification.success"),
          message: t("notificationMessages.deleteChat"),
        })
      );
    },
  });
};

export default deleteChat;
