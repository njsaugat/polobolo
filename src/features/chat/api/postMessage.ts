import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { ResponseType } from "types/responseType";
import {
  Author,
  Chat,
  ChatMessage,
} from "../../../features/posts/types/postType";
import { axios } from "../../../services/apiClient";
import { RootState } from "../../../stores/store";

export const updateChatListLastMessage = (
  chatId: string | undefined,
  content: string,
  queryClient: QueryClient
) => {
  queryClient.setQueryData<ResponseType<Chat[]>>(["chats"], (oldChatsList) => {
    if (!oldChatsList) return oldChatsList;

    return {
      ...oldChatsList,
      data: oldChatsList.data.map((chat) => {
        if (chat._id === chatId) {
          return {
            ...chat,
            lastMessage: {
              ...chat.lastMessage,
              content: content,
            },
          };
        }
        return chat;
      }),
    };
  });
};

const postMessage = (chatId: string | undefined) => {
  const queryClient = useQueryClient();
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const postChatData = (formData: any) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(`/chat-app/messages/${chatId}`, formData, config);
  };
  return useMutation({
    mutationFn: postChatData,
    onMutate: async (formData) => {
      await queryClient.cancelQueries({
        queryKey: ["chats", "messages", chatId],
      });

      const previousMessages = queryClient.getQueryData([
        "chats",
        "messages",
        chatId,
      ]);

      queryClient.setQueryData<ResponseType<ChatMessage[]>>(
        ["chats", "messages", chatId],
        (oldChats) => {
          if (!oldChats) return oldChats;
          let existingChatMessage = oldChats.data.find(
            (message) => message.sender._id === user?.account._id
          );
          if (!existingChatMessage) return { ...oldChats };
          let newChatMessage = {
            ...existingChatMessage,
            _id: nanoid(),
            content: formData.get("content"),
          };
          return {
            ...oldChats,
            data: [newChatMessage, ...oldChats.data],
          };
        }
      );
      updateChatListLastMessage(chatId, formData.get("content"), queryClient);
      return { previousMessages };
    },
    onError: (err, newChat, context) => {
      if (!context) return;
      queryClient.setQueryData(
        ["chats", "messages", chatId],
        context.previousMessages
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["chats", "messages", chatId]);
    },
  });
};

export default postMessage;
