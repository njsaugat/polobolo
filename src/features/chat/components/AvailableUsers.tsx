import React, { Fragment, useEffect, useState } from "react";
import getAllUsers from "../api/getAllUser";
import { Combobox, Menu, Transition } from "@headlessui/react";
import AuthorProfile from "../../../features/user/Components/AuthorProfile";
import { Author, Chat, ChatUser } from "../../../features/posts/types/postType";
import { ShimmerAvatars } from "../../../components/Shimmer/ShimmerAvatar";
import createChat from "../api/createOnetoOneChat";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon as MagnifyingGlassIcon,
} from "@heroicons/react/outline";
import Toggle from "../../../components/Elements/Toggle";
import { Button } from "../../../components/Elements/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";

type AvailableUsersProps = {
  isChat: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  addParticipant?: (participantId: string) => void;
};
const AvailableUsers = ({
  isChat,
  buttonRef,
  addParticipant,
}: AvailableUsersProps) => {
  const queryClient = useQueryClient();
  const [isSearching, setIsSearching] = useState(
    queryClient.getQueriesData(["chats", "users"])?.length > 0 ? true : false
  );
  const { isLoading, error, data: users } = getAllUsers(isSearching);
  const [query, setQuery] = useState("");
  const [isGroupChatEnabled, setIsGroupChatEnabled] = useState(false);
  const [selected, setSelected] = useState<ChatUser | ChatUser[]>();
  const { mutate, error: createChatError } = createChat();

  const loggedInUser = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const handleClear = () => {
    isGroupChatEnabled ? setSelected([]) : setSelected(undefined);
    setIsGroupChatEnabled(false);
    setQuery(" ");
  };
  let filteredPeople: ChatUser[] | undefined = undefined;

  if (!isLoading && isSearching) {
    filteredPeople =
      query === ""
        ? users?.data
        : users?.data.filter((user) =>
            user.username
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
  }

  useEffect(() => {
    if (buttonRef) {
      buttonRef.current && buttonRef.current.click();
    }
  }, [buttonRef]);

  useEffect(() => {
    if (isGroupChatEnabled) {
      setSelected([]);
    } else {
      setSelected(undefined);
    }
  }, [isGroupChatEnabled]);

  return (
    <>
      <div className="relative w-full transition-all duration-300">
        <Combobox
          value={selected}
          onChange={setSelected}
          // @ts-ignore
          multiple={isGroupChatEnabled}
        >
          <div className="relative mx-3 mt-1 mb-5">
            <div className="relative flex items-center w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <MagnifyingGlassIcon
                className={" pl-1 h-5 w-5 text-gray-500 inline-block"}
              />

              <Combobox.Input
                placeholder={isChat ? "Search User" : "Search Profiles"}
                className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:outline-none"
                displayValue={(selected: ChatUser | ChatUser[]) =>
                  selected
                    ? Array.isArray(selected)
                      ? selected.map((person) => person.username).join(", ")
                      : selected?.username || ""
                    : ""
                }
                onChange={(event) => {
                  !isSearching ? setIsSearching(true) : null;
                  setQuery(event.target.value);
                }}
              />
              <Combobox.Button
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                onClick={() => (!isSearching ? setIsSearching(true) : null)}
                ref={buttonRef}
              >
                <ChevronDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => handleClear()}
            >
              {true ? (
                <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto overflow-x-hidden text-base bg-white rounded-md max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {isLoading ? (
                    <ShimmerAvatars />
                  ) : filteredPeople?.length === 0 && query !== "" ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                      Nothing found.
                    </div>
                  ) : (
                    <>
                      {isChat && isSearching ? (
                        <div className="flex items-center justify-between w-full pr-3 pl-14 ">
                          <span>Create group</span>
                          <Toggle
                            enabled={isGroupChatEnabled}
                            setEnabled={setIsGroupChatEnabled}
                            removePreviousSelected={() =>
                              isGroupChatEnabled
                                ? setSelected([])
                                : setSelected(undefined)
                            }
                          />
                        </div>
                      ) : null}
                      {filteredPeople?.map((user) => (
                        <Combobox.Option
                          key={user?._id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-teal-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={user}
                        >
                          {({ selected, active }) => (
                            <>
                              {
                                <div
                                  onClick={
                                    !isGroupChatEnabled ? handleClear : () => {}
                                  }
                                  className="flex justify-between "
                                >
                                  <AuthorProfile
                                    username={user?.username}
                                    url={user?.avatar.url}
                                    firstName={user?.username}
                                    lastName={""}
                                    bio={""}
                                    isChat={isChat}
                                    isGroupChat={
                                      isGroupChatEnabled || !!addParticipant
                                    }
                                    closeModal={
                                      !isGroupChatEnabled
                                        ? handleClear
                                        : () => {}
                                    }
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
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </>
                  )}
                </Combobox.Options>
              ) : null}
            </Transition>
          </div>
        </Combobox>
        {isGroupChatEnabled ? (
          <div className="absolute z-50 flex items-end justify-center w-full bg-slate-50 -bottom-72 ">
            <div className="w-[94%] shadow-2xl border-b border-l -translate-y-1 rounded-md flex justify-end">
              <Button
                variant="blend"
                className=""
                onClick={() => {
                  setIsGroupChatEnabled(false);
                  mutate({
                    isGroup: true,
                    receiverIds: Array.isArray(selected)
                      ? selected?.map((u) => u._id)
                      : [""],
                    name: Array.isArray(selected)
                      ? `${
                          loggedInUser ? loggedInUser?.account.username : ""
                        },${selected.reduce((result, user) => {
                          return result === ""
                            ? user.username
                            : `${result}, ${user.username}`;
                        }, "")}`
                      : "",
                  });
                }}
                disabled={!(Array.isArray(selected) && selected?.length > 1)}
              >
                {"Create Group"}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AvailableUsers;
