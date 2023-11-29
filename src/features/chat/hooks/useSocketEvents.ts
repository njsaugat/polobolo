import { QueryClient } from "@tanstack/react-query";
import { Chat } from "features/posts/types/postType";
import { useEffect, useState } from "react";
import { ResponseType } from "types/responseType";
import {
  CONNECTED_EVENT,
  DISCONNECT_EVENT,
  LEAVE_CHAT_EVENT,
  NEW_CHAT_EVENT,
  UPDATE_GROUP_NAME_EVENT,
} from "../../../config/constants";
import { useSocket } from "../../../context/SocketContext";
import { deleteOneToOneChat } from "../api/deleteChat";
import { updateGroupChatNameHelper } from "../api/updateGroupChatName";

const useSocketEvents = () => {
  const queryClient = new QueryClient();
  const [isConnected, setIsConnected] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const handleConnect = () => setIsConnected(true);
  const handleDisconnect = () => setIsDisconnected(true);

  const { socket } = useSocket();
  useEffect(() => {
    const handleNewChat = (chat: Chat) => {
      queryClient.setQueryData<ResponseType<Chat[]>>(["chats"], (oldChats) => {
        if (!oldChats) return oldChats;
        return {
          ...oldChats,
          data: [chat, ...oldChats.data],
        };
      });
    };
    const handleDeleteChat = (chat: Chat) => {
      deleteOneToOneChat(queryClient, chat._id);
    };

    const updateGroupName = (chat: Chat) => {
      updateGroupChatNameHelper(queryClient, chat._id, chat.name);
    };

    socket?.on(CONNECTED_EVENT, handleConnect);
    socket?.on(DISCONNECT_EVENT, handleDisconnect);

    socket?.on(NEW_CHAT_EVENT, handleNewChat);
    socket?.on(LEAVE_CHAT_EVENT, handleDeleteChat);
    socket?.on(UPDATE_GROUP_NAME_EVENT, updateGroupName);

    return () => {
      socket?.off(CONNECTED_EVENT, handleConnect);
      socket?.off(DISCONNECT_EVENT, handleDisconnect);
      socket?.off(NEW_CHAT_EVENT, handleNewChat);
      socket?.off(LEAVE_CHAT_EVENT, handleDeleteChat);
      socket?.off(UPDATE_GROUP_NAME_EVENT, updateGroupName);
    };
  }, [socket]);
};

export default useSocketEvents;
