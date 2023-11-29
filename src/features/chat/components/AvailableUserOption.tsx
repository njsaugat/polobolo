import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ChatUser } from "../../../features/posts/types/postType";
import AuthorProfile from "../../../features/user/Components/AuthorProfile";
import { CreateChatProps } from "../api/createOnetoOneChat";

type AvailableUserOptionProps = {
  user: ChatUser;
  isGroupChatEnabled: boolean;
  handleClear: () => void;
  isChat: boolean;
  addParticipant?: (participantId: string) => void;
  mutate: ({ receiverIds, name, isGroup }: CreateChatProps) => void;
};
const AvailableUserOption = ({
  user,
  isGroupChatEnabled,
  handleClear,
  isChat,
  addParticipant,
  mutate,
}: AvailableUserOptionProps) => {
  return (
    <Combobox.Option
      key={user?._id}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? "bg-teal-600 text-white" : "text-gray-900"
        }`
      }
      value={user}
    >
      {({ selected, active }) => (
        <>
          {
            <div
              onClick={!isGroupChatEnabled ? handleClear : () => {}}
              className="flex justify-between "
            >
              <AuthorProfile
                username={user?.username}
                url={user?.avatar.url}
                firstName={user?.username}
                lastName={""}
                bio={""}
                isChat={isChat}
                isGroupChat={isGroupChatEnabled || !!addParticipant}
                closeModal={!isGroupChatEnabled ? handleClear : () => {}}
                createChat={
                  isChat && !isGroupChatEnabled
                    ? () =>
                        mutate({
                          isGroup: false,
                          receiverIds: [user._id],
                          name: user.username,
                        })
                    : addParticipant
                    ? () => addParticipant(user._id)
                    : () => {}
                }
              />
            </div>
          }
          {selected ? (
            <span
              className={`absolute  justify-center   inset-y-0  right-2 flex items-center pl-3 ${
                active ? "text-white" : "text-teal-600"
              }`}
            >
              <CheckIcon className="w-5 h-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Combobox.Option>
  );
};

export default AvailableUserOption;
