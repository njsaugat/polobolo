import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Elements/Button";
import { Dialog } from "../../../components/Elements/Dialog";
import ShimmerChatList from "../../../components/Shimmer/ShimmerChatList";
import DeletePost from "../../../features/posts/Components/DeletePost";
import EditDeleteMenu from "../../../features/posts/Components/EditDeletePostMenu";
import { Author, Chat, ChatUser } from "../../../features/posts/types/postType";
import { RootState } from "../../../stores/store";
import addChatMember from "../api/addDeleteMembers";
import deleteChat from "../api/deleteChat";
import getUserChat from "../api/getUserChat";
import useSocketEvents from "../hooks/useSocketEvents";
import AvailableUsers from "./AvailableUsers";
import ChatAuthorProfile from "./ChatAuthorProfile";
import ChatMembers from "./ChatMembers";
import EditGroupPostName from "./EditGroupPostName";

function truncateMessage(text: string, maxLength: number) {
  // if (!text) {
  //   return "Start the conversation.😊";
  // }
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
  const [lastMessage, setLastMessage] = useState<string | undefined>();
  const [hoveredId, setHoveredId] = useState("");
  const [addParticipantChatId, setAddParticipantChatId] = useState("");
  const [isOpenChatDelete, setIsOpenChatDelete] = useState<DeleteChat>();
  const [chatInfoId, setChatInfoId] = useState("");
  const [isOpenChatLeave, setIsOpenChatLeave] = useState<LeaveChat>();
  const [editGroupChat, setEditGroupChat] = useState<EditChatName>();

  const closeAddUserModal = () => setAddParticipantChatId("");
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isUserGroupAdmin = (chat: Chat) => chat?.admin === user?.account?._id;

  const openLeaveChatModal = (chat: Chat) =>
    setIsOpenChatLeave({
      chatId: chat?._id,
      isGroupChat: chat?.isGroupChat,
      isLeave: true,
    });
  const openEditChatNameModal = (chat: Chat) =>
    chat.isGroupChat && isUserGroupAdmin(chat)
      ? () =>
          setEditGroupChat({
            chatId: chat?._id,
            groupName: chat?.name,
          })
      : () => {};

  const openDeleteChatModal = (chat: Chat) =>
    !chat.isGroupChat || isUserGroupAdmin(chat)
      ? setIsOpenChatDelete({
          chatId: chat?._id,
          isGroupChat: chat?.isGroupChat,
        })
      : () => {};
  const addParticipant = (participantId: string) => {
    mutateAddMember({
      participantId: participantId,
      chatId: addParticipantChatId,
    });
    closeAddUserModal();
  };
  const closeInfoModal = () => setChatInfoId("");
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
                      }  block px-2 py-3 cursor-pointer nav-link relative`
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
                        lastMessage
                          ? lastMessage
                          : chat?.lastMessage?.content ??
                              `${t("chatPage.startChat")} 😊`,
                        20
                      )}
                      sentTime={chat?.updatedAt}
                      isGroupChat={chat?.isGroupChat}
                    />
                    {hoveredId === chat._id && (
                      <EditDeleteMenu
                        openInfoModal={() => setChatInfoId(chat?._id)}
                        openAddParticipantModal={() => {
                          setAddParticipantChatId(chat?._id);
                        }}
                        openLeaveModal={() => openLeaveChatModal(chat)}
                        openEditModal={openEditChatNameModal(chat)}
                        openDeleteModal={() => openDeleteChatModal(chat)}
                        isNotEdit={
                          !(chat?.isGroupChat
                            ? isUserGroupAdmin(chat)
                            : chat?.isGroupChat)
                        }
                        showGroupInfo={chat?.isGroupChat}
                        isShown={true}
                        isNotDelete={
                          !(chat?.isGroupChat ? isUserGroupAdmin(chat) : true)
                        }
                        isGroupLeaveOption={chat?.isGroupChat}
                        isGroupAdmin={isUserGroupAdmin(chat)}
                      />
                    )}
                  </NavLink>
                )
            )}
          </React.Fragment>
        ))}
      </div>
      {!!addParticipantChatId ? (
        <Dialog
          isOpen={!!addParticipantChatId}
          closeModal={closeAddUserModal}
          className="rounded-lg md:w-1/2 h-96 lg:w-1/3 deleteDialog "
          modalClassName=" mx-10"
        >
          <div className="flex flex-col justify-between h-full">
            <AvailableUsers
              isChat={false}
              buttonRef={buttonRef}
              addParticipant={addParticipant}
            />
            <Button
              variant="blend"
              className="self-end"
              onClick={() => buttonRef?.current?.click()}
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
          content={t("chatPage.leaveChat")}
        />
      ) : null}
      {!!chatInfoId ? (
        <ChatMembers chatInfoId={chatInfoId} closeModal={closeInfoModal} />
      ) : null}

      {editGroupChat?.chatId ? (
        <EditGroupPostName
          chatId={editGroupChat?.chatId}
          closeModal={() => setEditGroupChat(undefined)}
          groupName={editGroupChat?.groupName}
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
          content={t("chatPage.deleteChat")}
        />
      ) : null}
    </>
  );
};

export default ChatList;
