import React, { useEffect, useRef, useState } from "react";
import getUserChat from "../api/getUserChat";
import ShimmerComment from "../../../components/Shimmer/ShimmerComment";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { Author, Chat, ChatUser } from "../../../features/posts/types/postType";
import ChatAuthorProfile from "./ChatAuthorProfile";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import AvailableUsers from "./AvailableUsers";
import EditDeleteMenu from "../../../features/posts/Components/EditDeletePostMenu";
import DeletePost from "../../../features/posts/Components/DeletePost";
import deleteChat, { deleteOneToOneChat } from "../api/deleteChat";
import EditGroupPostName from "./EditGroupPostName";
import { Dialog } from "../../../components/Elements/Dialog";
import AuthorProfile from "../../../features/user/Components/AuthorProfile";
import { Button } from "../../../components/Elements/Button";
import addChatMember from "../api/addDeleteMembers";
import useSocketEvents from "../hooks/useSocketEvents";
import { ResponseType } from "types/responseType";
import ShimmerChatList from "../../../components/Shimmer/ShimmerChatList";

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
  const [isOpenChatAddParticipant, setIsOpenChatAddParticipant] = useState("");
  const [isOpenChatDelete, setIsOpenChatDelete] = useState<DeleteChat>();
  const [isOpenChatInfoId, setIsOpenChatInfoId] = useState("");
  const [isOpenChatLeave, setIsOpenChatLeave] = useState<LeaveChat>();
  const [isOpenGroupChatEdit, setIsOpenGroupChatEdit] =
    useState<EditChatName>();
  const [isConnected, setIsConnected] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const closeAddUserModal = () => setIsOpenChatAddParticipant("");
  const { mutate: mutateAddMember } = addChatMember();
  const buttonRef = useRef<HTMLButtonElement>(null);
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

  // register all socket events:
  useSocketEvents();

  if (isLoading) {
    return <ShimmerChatList />;
  }

  return (
    <>
      <AvailableUsers isChat={true} />
      <div className="h-[calc(100vh-70px)] md:h-[calc(100%-70px)] overflow-y-auto">
        {data?.data?.length === 0 ? "Start Chatting" : null}
        {data?.data?.map((chat: Chat) => (
          <React.Fragment key={chat._id}>
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
                        openAddParticipantModal={() => {
                          setIsOpenChatAddParticipant(chat?._id);
                        }}
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
                        isGroupAdmin={chat?.admin === user?.account?._id}
                      />
                    )}
                  </NavLink>
                )
            )}
          </React.Fragment>
        ))}
      </div>
      {!!isOpenChatAddParticipant ? (
        <Dialog
          isOpen={!!isOpenChatAddParticipant}
          closeModal={closeAddUserModal}
          className="rounded-lg md:w-1/2 h-96 lg:w-1/3 deleteDialog "
          modalClassName=" mx-10"
        >
          <div className="flex flex-col justify-between h-full">
            <AvailableUsers
              isChat={false}
              buttonRef={buttonRef}
              addParticipant={(participantId: string) => {
                mutateAddMember({
                  participantId: participantId,
                  chatId: isOpenChatAddParticipant,
                });
                closeAddUserModal();
              }}
            />
            <Button
              variant="blend"
              className="self-end"
              onClick={() => {
                mutateAddMember({
                  participantId: "",
                  chatId: isOpenChatAddParticipant,
                });
              }}
            >
              Add Participant
            </Button>
          </div>
        </Dialog>
      ) : null}
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
          {queryClient
            .getQueryData<ResponseType<Chat[]>>(["chats"])
            ?.data.map((chat: Chat) =>
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
