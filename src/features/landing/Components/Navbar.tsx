import Logo from "../../../components/Shared/Logo";
import { Button } from "../../../components/Elements/Button";
import { Link } from "react-router-dom";
import Avatar from "../../user/Components/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { Author } from "../../../features/posts/types/postType";
import NavbarMenu from "./NavBarMenu";
import useScreenSize from "../../../hooks/useScreenSize";
import { inputFieldStyle } from "../../../components/Form/InputField";
import useAuthCheck from "../../../hooks/useAuthCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import AvailableUsers from "../../../features/chat/components/AvailableUsers";
import React, { useState } from "react";

const Navbar = () => {
  const user = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const [isSearching, setIsSearching] = useState(false);
  const isLoggedIn = useAuthCheck();
  const isScreenSmall = useScreenSize(765);
  console.log("rendered");
  return (
    <div className="flex items-center justify-between w-screen mt-3 mb-10 overflow-hidden md:mx-28">
      <ul className="flex items-center justify-start md:w-2/3 lg:w-1/3 md:justify-between">
        {/* {isScreenSmall ? <Logo content={"Pb"} className="w-16" /> : <Logo />} */}
        <Logo />
      </ul>
      {/* <input className={`${inputFieldStyle} rounded-full lg:w-1/2`} /> */}
      {!isScreenSmall && isLoggedIn && user && (
        <div className="w-1/3">
          {/* <AvailableUsers
            isChat={false}
            setIsSearching={setIsSearching}
            isSearching={isSearching}
          /> */}
          <AvailableUsers isChat={false} />
        </div>
      )}
      <Link to={"/chats"}>
        <FontAwesomeIcon
          icon={faComment}
          className="text-2xl text-teal-500 -rotate-0"
        />
      </Link>

      <ul
        className={`flex items-center w-full ${
          isScreenSmall && "justify-end"
        } md:w-1/3 lg:w-1/5`}
      >
        {isLoggedIn && user ? (
          <>
            {/* {isScreenSmall ? (
              <button className="absolute right-2" 
              onClick={()=>setIsOpen(true)}>
                <FontAwesomeIcon icon={faBars} className="text-xl"  />
              </button>
            ) : (
              <>
                <Avatar
                  url={user?.account.avatar.url}
                  firstName={user?.account.username}
                  username={user?.account.username}
                />
                <NavbarMenu username={user?.account.username} />
              </>
            )} */}
            <>
              <Avatar
                url={user?.account.avatar.url}
                firstName={user?.account.username}
                username={user?.account.username}
              />
              <NavbarMenu username={user?.account.username} />
            </>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="p-3 mx-3 font-bold bg-gradient-to-r from-teal-50 to-slate-100">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="font-bold">Signup</Button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
