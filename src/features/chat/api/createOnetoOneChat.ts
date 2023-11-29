import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "../../../types/responseType";
import { Chat } from "../../../features/posts/types/postType";
import { JOIN_CHAT_EVENT } from "../../../config/constants";
import { useSocket } from "../../../context/SocketContext";
import { addNotification } from "../../../stores/notificationSlice";
import store from "../../../stores/store";
import { useTranslation } from "react-i18next";
export type CreateChatProps = {
  receiverIds: string[];
  name: string;
  isGroup: boolean;
};
const createChat = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const postCreateChat = ({ receiverIds, isGroup, name }: CreateChatProps) => {
    if (isGroup) {
      const groupChatData = { name: name, participants: receiverIds };
      return axios.post<ResponseType<Chat>>(
        "/chat-app/chats/group",
        groupChatData
      );
    }

    return axios.post<ResponseType<Chat>>(
      `/chat-app/chats/c/${receiverIds[0]}`
    );
  };
  return useMutation({
    mutationFn: postCreateChat,
    onError: () => {},
    onSuccess: (response) => {
      const chatId = response.data._id;
      setTimeout(() => {
        navigate(`/chats/${chatId}`);
      }, 500);
      socket?.emit(JOIN_CHAT_EVENT, chatId);
      const { dispatch } = store;
      dispatch(
        addNotification({
          type: "success",
          title: t("notification.success"),
          message: t("notificationMessages.createChat"),
        })
      );

      queryClient.invalidateQueries(["chats"]);
    },
  });
};

export default createChat;
