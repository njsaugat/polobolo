import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
};
const Navbar = ({ isLoggedIn, user }: NavbarProps) => {
  const isScreenSmall = useScreenSize(765);
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between w-screen mt-3 mb-10 overflow-hidden md:mx-28">
      <ul className="flex items-center justify-start md:w-2/3 lg:w-1/3 md:justify-between">
        {/* {isScreenSmall ? <Logo content={"Pb"} className="w-16" /> : <Logo />} */}
        <Logo />
      </ul>
      {/* <input className={`${inputFieldStyle} rounded-full lg:w-1/2`} /> */}
      {!isScreenSmall && isLoggedIn && user && (
        <div className="w-1/2 translate-y-2 lg:w-1/3">
          {/* <AvailableUsers
            isChat={false}
            setIsSearching={setIsSearching}
            isSearching={isSearching}
          /> */}
          <AvailableUsers isChat={false} />
        </div>
      )}
      <Link to={"/chats"} className="translate-y-1">
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
        <NavbarMenu username={user?.account.username} />
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
              {/* <NavbarMenu username={user?.account.username} /> */}
            </>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="p-3 mx-3 font-bold bg-gradient-to-r from-teal-50 to-slate-100">
                {t("landingPage.login")}
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="font-bold">{t("landingPage.signup")}</Button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
