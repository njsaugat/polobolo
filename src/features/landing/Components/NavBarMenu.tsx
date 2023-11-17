import { faAngleDown, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { links } from "../../../utils/navbarLinks";
import { Link } from "react-router-dom";
import useLogoutUser from "../../auth/api/logoutUser";
import { Button } from "../../../components/Elements/Button";
import DeletePost from "../../../features/posts/Components/DeletePost";

type NavbarMenuProps = {
  username: string;
};
export default function NavbarMenu({ username }: NavbarMenuProps) {
  const { mutate, error, isLoading } = useLogoutUser();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const closeModal = () => setIsLogoutOpen(false);
  return (
    <Menu as="div" className={`  overflow-x-hidden`}>
      <div>
        <Menu.Button
          className={`  w-8 h-8  hover:bg-slate-200 text-center rounded-full transtion-all`}
        >
          <FontAwesomeIcon
            className={` text-xl  rounded-full cursor-pointer  text-slate-700`}
            icon={faAngleDown}
          />
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
          className={`absolute right-1 md:right-[1%] lg:right-[12%]   lg:translate-x-full top-16 border w-32  z-50  bg-white shadow-xl overflow-x-hidden `}
        >
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/home`}
                  className={`${
                    active
                      ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                      : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                >
                  {<FontAwesomeIcon icon={faHome} />} &nbsp;
                  <span className={` text-xs `}>{"Home"}</span>
                </Link>
              )}
            </Menu.Item>
            {links.map((link) => {
              return (
                <Menu.Item key={link.link + link.id}>
                  {({ active }) => (
                    <Link
                      to={`/user/${username}/${link.link}`}
                      className={`${
                        active
                          ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                          : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                    >
                      {link.icon} &nbsp;
                      <span className={` text-xs `}>{link.text}</span>
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
            <hr />
            <Menu.Item>
              {({ active }) => (
                <Button
                  variant="moretransparent"
                  className={`${
                    active
                      ? "bg-gradient-to-r from-teal-200 to-teal-400  text-slate-700"
                      : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm border-none mt-1 `}
                  onClick={() => setIsLogoutOpen(true)}
                >
                  {} &nbsp;
                  <span className={` text-xs `}>{"Logout"}</span>
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      {isLogoutOpen && (
        <>
          <DeletePost
            isOpen={isLogoutOpen}
            closeModal={closeModal}
            isLoading={isLoading}
            handleDelete={() => {
              mutate();
              closeModal();
            }}
            content="Are you sure you want to logout❓"
          />
        </>
      )}
    </Menu>
  );
}