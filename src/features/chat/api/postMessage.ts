import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../../utils/index";
import store, { RootState } from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import {
  Author,
  Chat,
  ChatMessage,
} from "../../../features/posts/types/postType";
import { useSelector } from "react-redux";
import { ResponseType } from "types/responseType";
import { nanoid } from "nanoid";

export const updateChatListLastMessage = (
  chatId: string | undefined,
  content: string,
  queryClient: QueryClient
) => {
  // const queryClient = useQueryClient();
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

// export const updateChatMessage=(chatId:string|undefined)=>{
//   const queryClient = useQueryClient();
//   queryClient.setQueryData<ResponseType<ChatMessage[]>>(
//     ["chats", "messages", chatId],
//     (oldChats) => {
//       if (!oldChats) return oldChats;
//       let existingChatMessage = oldChats.data.find(
//         (message) => message.sender._id === user?.account._id
//       );
//       let newChatMessage = {
//         ...existingChatMessage,
//         _id: nanoid(),
//         content: formData.get("content"),
//       };
//       // newChatMessage.content = formData.get("content");
//       const newChats = [newChatMessage, ...oldChats.data];

//       return {
//         ...oldChats,
//         data: newChats,
//       };
//     }
//   );
// }

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
    // mutationKey: ["user"],
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
      //   const { dispatch } = store;
      //   dispatch(
      //     addNotification({
      //       type: "success",
      //       title: "Success",
      //       message: response?.message,
      //     })
      //   );
    },
  });
};

export default postMessage;
