import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeftIcon, SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Elements/Button";
import Logo from "../../../components/Shared/Logo";
import AvailableUsers from "../../../features/chat/components/AvailableUsers";
import { Author } from "../../../features/posts/types/postType";
import useScreenSize from "../../../hooks/useScreenSize";
import Avatar from "../../user/Components/Avatar";
import NavbarMenu from "./NavBarMenu";

type NavbarProps = {
  isLoggedIn?: boolean;
  user?: Author;
  isLoading?: boolean;
};
const Navbar = ({ isLoggedIn, user, isLoading }: NavbarProps) => {
  const isScreenSmall = useScreenSize(765);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <div className="relative flex items-center w-screen px-2 pt-2 transition-all duration-300 space-around">
      {showSearchBar && isScreenSmall ? (
        <>
          <ArrowLeftIcon
            className={
              " -translate-y-1.5 h-6 w-6 text-gray-500 inline-block cursor-pointer"
            }
            onClick={() => setShowSearchBar(false)}
          />
          <div className="w-full ">
            {user && <AvailableUsers isChat={false} />}
          </div>
        </>
      ) : (
        <>
          {/* <Logo /> */}
          {isScreenSmall ? <Logo content={"Pb"} className="w-16 " /> : <Logo />}

          {!isScreenSmall && isLoggedIn ? (
            <div className="flex items-center justify-center w-2/5 md:ml-[10%] lg:ml-[16%] pt-1 ">
              {user && <AvailableUsers isChat={false} />}
            </div>
          ) : null}
          <div
            className={`absolute flex items-center justify-center ${
              isLoggedIn ? "left-[50%]" : "left-[35%]"
            }  
            
            ${isLoggedIn ? "md:left-[82%]" : "md:left-[60%] lg:left-[72%]"}
            `}
          >
            {isLoggedIn && user ? (
              <>
                {isScreenSmall ? (
                  <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-full cursor-pointer bg-slate-200">
                    <SearchIcon
                      onClick={() => setShowSearchBar(true)}
                      className={"  h-6 w-6 text-gray-500 inline-block"}
                    />
                  </div>
                ) : null}{" "}
                <Link to={"/chats"} className="mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 ">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-2xl text-teal-500 -rotate-0 hover:animate-pulse"
                    />
                  </div>
                </Link>
                <Avatar
                  url={user?.account.avatar.url}
                  firstName={user?.account.username}
                  username={user?.account.username}
                />
                <NavbarMenu username={user?.account.username} />
              </>
            ) : (
              <>
                {isLoading ? (
                  <>
                    <div className="w-10 h-10 mr-10 rounded-full image bg-slate-200 animate-pulse"></div>
                    <div className="w-10 h-10 rounded-full image bg-slate-200 animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button className="p-3 mx-3 font-bold bg-gradient-to-r from-teal-50 to-slate-100">
                        {t("landingPage.login")}
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="font-bold">
                        {t("landingPage.signup")}
                      </Button>
                    </Link>
                    <NavbarMenu username={user?.account.username} />
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
