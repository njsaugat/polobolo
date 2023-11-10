import React, {
  ForwardRefRenderFunction,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import getUserChat from "../api/getUserChat";
import ShimmerComment from "../../../components/Shimmer/ShimmerComment";
import ShimmerAvatar from "../../../components/Shimmer/ShimmerAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import {
  Author,
  Chat,
  ChatMessage,
  ChatUser,
} from "../../../features/posts/types/postType";
import ChatAuthorProfile from "./ChatAuthorProfile";
import {
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";
import {
  CONNECTED_EVENT,
  DISCONNECT_EVENT,
  LEAVE_CHAT_EVENT,
  MESSAGE_RECEIVED_EVENT,
  NEW_CHAT_EVENT,
} from "./ChatSection";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "types/responseType";
import AvailableUsers from "./AvailableUsers";
import EditDeleteMenu from "../../../features/posts/Components/EditDeletePostMenu";
import DeletePost from "../../../features/posts/Components/DeletePost";
import deleteChat, { deleteOneToOneChat } from "../api/deleteChat";
import EditGroupPostName from "./EditGroupPostName";
import { Dialog } from "../../../components/Elements/Dialog";
import AuthorProfile from "../../../features/user/Components/AuthorProfile";

//

type ChatListProps = {
  handleChatId: (chatId: string) => void;
};
function truncateMessage(text: string, maxLength: number) {
  if (!text) {
    return "Start the conversation.😊";
  }
  if (text?.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}

type EditChatName = {
  chatId: string;
  groupName: string;
};
type DeleteChat = {
  chatId: string;
  isGroupChat: boolean;
};
type LeaveChat = DeleteChat & {
  isLeave: boolean;
};
const MemoAvailableUsers = React.memo(AvailableUsers);
const ChatList = () => {
  const { isLoading, data, error } = getUserChat();
  const queryClient = useQueryClient();
  const [lastMessage, setLastMessage] = useState<string | undefined>();
  const [hoveredId, setHoveredId] = useState("");
  // const [groupParticipants,setGroupParticipants]=useState()
  const [isOpenChatDelete, setIsOpenChatDelete] = useState<DeleteChat>();
  const [isOpenChatInfoId, setIsOpenChatInfoId] = useState("");
  const [isOpenChatLeave, setIsOpenChatLeave] = useState<LeaveChat>();
  const [isOpenGroupChatEdit, setIsOpenGroupChatEdit] =
    useState<EditChatName>();
  const [isConnected, setIsConnected] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const onConnect = () => setIsConnected(true);
  const onDisconnect = () => setIsDisconnected(true);

  const { chatId } = useParams();
  const {
    mutate,
    error: chatDeleteError,
    isLoading: isLoadingChatDelete,
  } = deleteChat();
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { socket } = useSocket();
  const navigate = useNavigate();

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
    socket?.on(CONNECTED_EVENT, onConnect);
    socket?.on(DISCONNECT_EVENT, onDisconnect);

    socket?.on(NEW_CHAT_EVENT, handleNewChat);
    socket?.on(LEAVE_CHAT_EVENT, handleDeleteChat);

    return () => {
      socket?.off(CONNECTED_EVENT, onConnect);
      socket?.off(DISCONNECT_EVENT, onDisconnect);
      socket?.off(NEW_CHAT_EVENT, handleNewChat);
      socket?.off(LEAVE_CHAT_EVENT, handleDeleteChat);
    };
  }, [socket]);

  if (isLoading) {
    return new Array(10).fill(1).map((value, index) => (
      <div key={value + index} className="w-full px-5 py-1 ">
        <ShimmerComment isChat={true} key={value + index} />
      </div>
    ));
  }

  return (
    <>
      <MemoAvailableUsers isChat={true} />
      <div className="h-[calc(100vh-70px)] md:h-[calc(100%-70px)] overflow-y-auto">
        {data?.data?.length === 0 ? "Start Chatting" : null}
        {data?.data?.map((chat: Chat) => (
          <div key={chat._id} className="relative">
            {chat.participants.map(
              (participant: ChatUser, index) =>
                (chat?.isGroupChat
                  ? index === 0
                  : participant._id !== user?.account._id) && (
                  <NavLink
                    key={chat._id + participant._id}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "   bg-gradient-to-r from-teal-50 to-teal-200   "
                          : "hover:bg-gradient-to-l  hover:from-slate-50 hover:to-slate-100"
                      }  block px-2 py-3 cursor-pointer nav-link `
                    }
                    to={`${chat?._id}`}
                    onMouseEnter={() => setHoveredId(chat?._id)}
                    onMouseLeave={() => setHoveredId("")}
                  >
                    <ChatAuthorProfile
                      username={
                        !chat.isGroupChat
                          ? participant.username
                          : truncateMessage(chat?.name, 20)
                      }
                      url={participant.avatar.url}
                      lastMessage={truncateMessage(
                        lastMessage ? lastMessage : chat?.lastMessage?.content,
                        20
                      )}
                      sentTime={chat?.updatedAt}
                      isGroupChat={chat?.isGroupChat}
                    />
                    {hoveredId === chat._id && (
                      <EditDeleteMenu
                        openInfoModal={() => setIsOpenChatInfoId(chat?._id)}
                        openLeaveModal={() =>
                          setIsOpenChatLeave({
                            chatId: chat?._id,
                            isGroupChat: chat?.isGroupChat,
                            isLeave: true,
                          })
                        }
                        openEditModal={
                          chat.isGroupChat && chat?.admin === user?.account?._id
                            ? () =>
                                setIsOpenGroupChatEdit({
                                  chatId: chat?._id,
                                  groupName: chat?.name,
                                })
                            : () => {}
                        }
                        openDeleteModal={() =>
                          !chat.isGroupChat ||
                          chat?.admin === user?.account?._id
                            ? setIsOpenChatDelete({
                                chatId: chat?._id,
                                isGroupChat: chat?.isGroupChat,
                              })
                            : () => {}
                        }
                        isNotEdit={
                          !(chat?.isGroupChat
                            ? chat?.admin === user?.account?._id
                            : chat?.isGroupChat)
                        }
                        showGroupInfo={chat?.isGroupChat}
                        isShown={true}
                        isNotDelete={
                          !(chat?.isGroupChat
                            ? chat?.admin === user?.account?._id
                            : true)
                        }
                        isGroupLeaveOption={chat?.isGroupChat}
                        // className="chat"
                      />
                    )}
                  </NavLink>
                )
            )}
          </div>
        ))}
      </div>

      {isOpenChatLeave ? (
        <DeletePost
          isOpen={!!isOpenChatLeave}
          closeModal={() => setIsOpenChatLeave(undefined)}
          isLoading={isLoadingChatDelete}
          handleDelete={() => {
            navigate(".");
            mutate({
              chatId: isOpenChatLeave?.chatId,
              isGroup: isOpenChatLeave?.isGroupChat,
              isLeave: isOpenChatLeave.isLeave,
            });
            setIsOpenChatLeave(undefined);
          }}
          content="Are you sure you want to leave the chat❓"
        />
      ) : null}
      {!!isOpenChatInfoId ? (
        <Dialog
          isOpen={!!isOpenChatInfoId}
          closeModal={() => setIsOpenChatInfoId("")}
          className="rounded-lg md:w-1/2 lg:w-1/3 deleteDialog "
          modalClassName=" mx-10"
        >
          <h3>Members:</h3>
          {queryClient.getQueryData(["chats"]).data.map((chat: Chat) =>
            chat._id === isOpenChatInfoId
              ? chat.participants.map((participant) => (
                  <div
                    key={participant?._id + participant?.username}
                    className="my-2"
                  >
                    <AuthorProfile
                      username={participant?.username}
                      url={participant?.avatar.url}
                      firstName={participant?.username}
                      lastName={""}
                      bio={""}
                      isChat={false}
                      isGroupChat={false}
                      closeModal={() => {}}
                    />
                  </div>
                ))
              : null
          )}
        </Dialog>
      ) : null}

      {isOpenGroupChatEdit?.chatId ? (
        <EditGroupPostName
          chatId={isOpenGroupChatEdit?.chatId}
          closeModal={() => setIsOpenGroupChatEdit(undefined)}
          groupName={isOpenGroupChatEdit?.groupName}
        />
      ) : null}
      {isOpenChatDelete?.chatId ? (
        <DeletePost
          isOpen={!!isOpenChatDelete?.chatId}
          closeModal={() => setIsOpenChatDelete(undefined)}
          isLoading={isLoadingChatDelete}
          handleDelete={() => {
            mutate({
              chatId: isOpenChatDelete?.chatId,
              isGroup: isOpenChatDelete?.isGroupChat,
            });
            setIsOpenChatDelete(undefined);
            navigate(".");
          }}
          content="Are you sure you want to delete the chat❓"
        />
      ) : null}
    </>
  );
};

export default ChatList;
