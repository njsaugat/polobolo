import React, { useEffect, useState } from "react";
import ChatComposer from "./ChatComposer";
import getChatMessages from "../api/getChatMessages";
import ChatAuthorProfile from "./ChatAuthorProfile";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author, Chat, ChatMessage } from "features/posts/types/postType";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "types/responseType";
import { updateChatListLastMessage } from "../api/postMessage";
import TypingChat from "./TypingChat";
import ShimmerChatSection from "../../../components/Shimmer/ShimmerChatSection";
import {
  MESSAGE_RECEIVED_EVENT,
  STOP_TYPING_EVENT,
  TYPING_EVENT,
} from "../../../config/constants";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

const ChatSection = () => {
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = getChatMessages(chatId);
  const [isTyping, setIsTyping] = useState(false);

  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { socket } = useSocket();
  const { t } = useTranslation();

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
    return <ShimmerChatSection />;
  }
  return (
    <>
      {/* <ErrorBoundary FallbackComponent={MyFallbackComponent}> */}
      <div className=" flex flex-col-reverse transition-all duration-1000  w-full h-[calc(100vh-140px)] md:h-[calc(100%-70px)] overflow-y-auto">
        {isTyping && <TypingChat />}
        {data?.data?.length === 0 ? (
          <h1 className="w-full mb-10 text-center">{t("chatPage.startChat")}</h1>
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
      {/* </ErrorBoundary> */}
    </>
  );
};

export default ChatSection;
