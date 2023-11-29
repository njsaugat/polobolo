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

const addChatMember = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { socket } = useSocket();
  const postAddChatMember = ({
    chatId,
    participantId,
  }: {
    participantId: string;
    chatId: string;
  }) => {
    return axios.post<ResponseType<Chat>>(
      `/chat-app/chats/group/${chatId}/${participantId}`
    );
  };
  return useMutation({
    mutationFn: postAddChatMember,
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
          message: t("notificationMessages.addMember"),
        })
      );

      queryClient.invalidateQueries(["chats"]);
    },
  });
};

export default addChatMember;
