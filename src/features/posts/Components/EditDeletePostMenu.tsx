import {
  faEdit,
  faEllipsis,
  faInfo,
  faSignOut,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type EditDeleteMenuProps = {
  openAddParticipantModal?: () => void;
  openInfoModal?: () => void;
  openLeaveModal?: () => void;
  openEditModal: () => void;
  openDeleteModal: () => void;
  className?: string;
  isShown?: boolean;
  isNotEdit?: boolean;
  isNotDelete?: boolean;
  showGroupInfo?: boolean;
  isGroupLeaveOption?: boolean;
  isGroupAdmin?: boolean;
};
export default function EditDeleteMenu({
  openAddParticipantModal,
  openInfoModal,
  openLeaveModal,
  openEditModal,
  openDeleteModal,
  className,
  isShown,
  isNotEdit,
  isNotDelete,
  showGroupInfo,
  isGroupLeaveOption,
  isGroupAdmin,
}: EditDeleteMenuProps) {
  return (
    <Menu
      as="div"
      className={`absolute top-4  ${
        className
          ? "translate-x-1.5 -translate-y-0.5  right-0 bottom-0.5"
          : "right-4"
      }`}
    >
      <div>
        <Menu.Button
          className={`${
            className ? " " : "w-8 h-8  hover:bg-slate-200"
          }   rounded-full transtion-all`}
        >
          {isShown && (
            <FontAwesomeIcon
              className={` text-xl rotate-90 rounded-full cursor-pointer  ${
                className ? "text-slate-500" : "text-slate-700"
              }`}
              icon={faEllipsis}
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0  z-50 ${
            className
              ? "w-20 h-20 overflow-auto -translate-y-10 -translate-x-6"
              : "w-32"
          }  h-auto origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="px-1 py-1 ">
            {showGroupInfo && isGroupAdmin ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openAddParticipantModal}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className={`pr-2  ${
                        active ? " text-slate-700" : "text-gray-900"
                      }`}
                    />
                    <span className={`${className ? "text-xs" : ""} `}>
                      Add User
                    </span>
                  </button>
                )}
              </Menu.Item>
            ) : null}
            {showGroupInfo ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openInfoModal}
                  >
                    <FontAwesomeIcon
                      icon={faInfo}
                      className={`px-1.5  ${
                        active ? " text-slate-700" : "text-gray-900"
                      }`}
                    />
                    <span className={`${className ? "text-xs" : ""} `}>
                      Info
                    </span>
                  </button>
                )}
              </Menu.Item>
            ) : null}
            {!isNotEdit ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openEditModal}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={`pr-1  ${
                        active ? " text-slate-700" : "text-gray-900"
                      }`}
                    />
                    <span className={`${className ? "text-xs" : ""} `}>
                      Edit
                    </span>
                  </button>
                )}
              </Menu.Item>
            ) : null}
            {isGroupLeaveOption ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openLeaveModal}
                  >
                    <FontAwesomeIcon
                      icon={faSignOut}
                      className={`pl-2  rotate-180 ${
                        active ? " text-slate-700" : "text-gray-900"
                      }`}
                    />
                    <span className={`${className ? "text-xs" : ""} `}>
                      Leave
                    </span>
                  </button>
                )}
              </Menu.Item>
            ) : null}
            {!isNotDelete ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gradient-to-r from-teal-200 to-teal-400"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openDeleteModal}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={`pr-1 
                      ${active ? " text-slate-700" : "text-gray-900"}
                      `}
                    />
                    <span className={`${className ? "text-xs" : ""}`}>
                      Delete
                    </span>
                  </button>
                )}
              </Menu.Item>
            ) : null}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
