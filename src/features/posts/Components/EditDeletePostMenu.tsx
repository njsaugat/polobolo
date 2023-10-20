import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type EditDeleteMenuProps = {
  openEditModal: () => void;
  openDeleteModal: () => void;
  className?: string;
  isShown?: boolean;
};
export default function EditDeleteMenu({
  openEditModal,
  openDeleteModal,
  className,
  isShown,
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
              // onClick={}
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
          className={`absolute right-0   ${
            className
              ? "w-20 h-20 overflow-auto -translate-y-10 -translate-x-6"
              : "w-32"
          }  h-auto origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="px-1 py-1 ">
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
                  {/* <EditActiveIcon /> */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={`pr-1  ${
                      active ? " text-slate-700" : "text-gray-900"
                    }`}
                  />
                  <span className={`${className ? "text-xs" : ""} `}>Edit</span>
                  {/* {className ? "" : "Edit"} */}
                </button>
              )}
            </Menu.Item>
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
