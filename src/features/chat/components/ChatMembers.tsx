import { useQueryClient } from "@tanstack/react-query";
import { Dialog } from "../../../components/Elements/Dialog";
import { Chat } from "../../../features/posts/types/postType";
import AuthorProfile from "../../../features/user/Components/AuthorProfile";
import React from "react";
import { ResponseType } from "../../../types/responseType";
import { useTranslation } from "react-i18next";

type ChatMembersProps = {
  chatInfoId: string;
  closeModal: () => void;
};
const ChatMembers = ({ chatInfoId, closeModal }: ChatMembersProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return (
    <Dialog
      isOpen={!!chatInfoId}
      closeModal={closeModal}
      className="rounded-lg md:w-1/2 lg:w-1/3 deleteDialog "
      modalClassName=" mx-10"
    >
      <h3>{t("chatPage.members")} :</h3>
      {queryClient
        .getQueryData<ResponseType<Chat[]>>(["chats"])
        ?.data.map((chat: Chat) =>
          chat._id === chatInfoId
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
  );
};

export default ChatMembers;
