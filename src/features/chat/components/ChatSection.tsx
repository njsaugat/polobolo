import { InputField } from "components/Form/InputFieldForm";
import React, { useEffect, useState } from "react";
import ChatComposer from "./ChatComposer";
import getChatMessages from "../api/getChatMessages";
import ShimmerComment from "../../../components/Shimmer/ShimmerComment";
import ChatAuthorProfile from "./ChatAuthorProfile";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author, Chat, ChatMessage } from "features/posts/types/postType";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";
import { getChatObjectMetadata } from "../utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "types/responseType";
import { updateChatListLastMessage } from "../api/postMessage";
import TypingChat from "./TypingChat";
import moment from "moment";

type ChatSectionProps = {
  chatId: string;
};

export const CONNECTED_EVENT = "connected";
export const DISCONNECT_EVENT = "disconnect";
export const JOIN_CHAT_EVENT = "joinChat";
export const NEW_CHAT_EVENT = "newChat";
export const TYPING_EVENT = "typing";
export const STOP_TYPING_EVENT = "stopTyping";
export const MESSAGE_RECEIVED_EVENT = "messageReceived";
export const LEAVE_CHAT_EVENT = "leaveChat";
export const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const ChatSection = () => {
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = getChatMessages(chatId);
  const [isTyping, setIsTyping] = useState(false);

  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { socket } = useSocket();

  const handleOnSocketTyping = (currentChatId: string) => {
    if (currentChatId !== chatId) return;
    setIsTyping(true);
  };
  const handleOnSocketStopTyping = (currentChatId: string) => {
    if (currentChatId !== chatId) return;
    setIsTyping(false);
  };
  const onMessageReceived = (chatMessage: ChatMessage) => {
    const previousChats: ResponseType<ChatMessage[]> | undefined =
      queryClient.getQueryData(["chats", "messages", chatId]);
    if (!previousChats) return;
    const newChats = [chatMessage, ...previousChats?.data];
    queryClient.setQueryData(["chats", "messages", chatId], {
      ...previousChats,
      data: newChats,
    });
    updateChatListLastMessage(chatId, chatMessage.content, queryClient);
  };

  useEffect(() => {
    socket?.on(TYPING_EVENT, handleOnSocketTyping);
    socket?.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket?.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      socket?.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket?.off(TYPING_EVENT, handleOnSocketTyping);
    };
  }, [socket]);

  if (isLoading) {
    return new Array(10).fill(1).map((value, index) => (
      <div key={value + index} className={`flex flex-col w-full px-5 py-1 `}>
        <ShimmerComment
          isChat={true}
          key={value + index}
          className={
            index % 2 === 1
              ? "flex-row-reverse  items-end justify-center teal"
              : "flex-row  "
          }
        />
      </div>
    ));
  }
  return (
    <>
      <div className=" flex flex-col-reverse transition-all duration-1000  w-full h-[calc(100vh-140px)] md:h-[calc(100%-70px)] overflow-y-auto">
        {isTyping && <TypingChat />}
        {data?.data?.length === 0 ? (
          <h1 className="w-full mb-10 text-center">
            {"Start the conversation"}
          </h1>
        ) : null}
        {data?.data?.map((chatMessage: ChatMessage) => (
          <div
            key={chatMessage._id}
            className={`
        ${
          user?.account._id === chatMessage.sender._id
            ? "self-end  flex flex-row-reverse"
            : null
        }
          p-2  w-full flex flex-wrap
        `}
          >
            <ChatAuthorProfile
              url={
                user?.account._id === chatMessage.sender._id
                  ? user?.account.avatar.url
                  : chatMessage.sender.avatar.url
              }
              username={chatMessage.sender.username}
              lastMessage={chatMessage.content}
              isChatSection={true}
              isUserSender={user?.account._id === chatMessage.sender._id}
              sentTime={chatMessage.createdAt}
            />
          </div>
        ))}
      </div>

      <ChatComposer addCurrentMessage={() => {}} />
    </>
  );
};

export default ChatSection;
