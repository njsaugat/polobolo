import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { ResponseType } from "../../../types/responseType";
import { Chat } from "../../../features/posts/types/postType";
import { UPDATE_GROUP_NAME_EVENT } from "../../../config/constants";
import { useSocket } from "../../../context/SocketContext";
import store from "../../../stores/store";
import { addNotification } from "../../../stores/notificationSlice";
import { useTranslation } from "react-i18next";

type EditGroupPostName = {
  chatId: string;
  groupName: string;
};

export const updateGroupChatNameHelper = (
  queryClient: QueryClient,
  chatId: string,
  updatedName: string
) => {
  queryClient.setQueryData<ResponseType<Chat[]>>(["chats"], (oldChats) => {
    if (!oldChats) return oldChats;
    return {
      ...oldChats,
      data: oldChats.data.map((chat) => {
        if (chat._id === chatId) {
          return {
            ...chat,
            name: updatedName,
          };
        }
        return chat;
      }),
    };
  });
};
const updateGroupChatName = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { socket } = useSocket();
  const updateName = ({ chatId, groupName }: EditGroupPostName) => {
    return axios.patch<ResponseType<Chat>>(`/chat-app/chats/group/${chatId}`, {
      name: groupName,
    });
  };
  return useMutation({
    mutationFn: updateName,
    onMutate: async ({ chatId, groupName }) => {
      await queryClient.cancelQueries({
        queryKey: ["chats"],
      });

      const previousChats = queryClient.getQueryData(["chats"]);
      updateGroupChatNameHelper(queryClient, chatId, groupName);
      return { previousChats };
    },
    onError: (err, newChat, context) => {
      if (!context) return;
      queryClient.setQueryData(["chats"], context.previousChats);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(["chats"]);
      socket?.emit(UPDATE_GROUP_NAME_EVENT, variables.chatId);
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: t("notificationMessages.updateGroupName"),
        })
      );
    },
  });
};

export default updateGroupChatName;
