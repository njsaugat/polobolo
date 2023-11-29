import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Button } from "../../../components/Elements/Button";
import ShimmerProfile from "../../../components/Shimmer/ShimmerProfile";
import { RootState } from "../../../stores/store";
import useLinks from "../../../utils/navbarLinks";
import { Author } from "../../posts/types/postType";
import getUserByUsername from "../api/getUserByUsername";
import Follow from "./Follow";
import UserProfileImage from "./UserProfileImage";

export interface UserProfileProps {
  userName: string;
}

const UserProfile = () => {
  const { username } = useParams();
  const { pathname } = useLocation();
  const [opened, setOpened] = useState("about");
  const links = useLinks();
  useEffect(() => {
    const pathArr = pathname.split("/");
    let currentRoute = pathArr[pathArr.length - 1];
    currentRoute = currentRoute === username ? "about" : currentRoute;
    setOpened(currentRoute);
  }, [pathname]);
  const { error, data, isLoading } = getUserByUsername(username);
  const loggedInUser = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );

  const user = data?.data;
  if (isLoading) {
    return <ShimmerProfile />;
  }
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-11/12 p-4 bg-white rounded-lg shadow-md ">
        <div className="relative mb-4">
          <UserProfileImage
            isUserAdmin={loggedInUser?.account.username === username}
            url={user?.coverImage?.url}
            isCover={true}
            coverTitle={`${user?.firstName.charAt(0)} ${user?.lastName.charAt(
              0
            )}`}
          />
          <UserProfileImage
            isUserAdmin={loggedInUser?.account.username === username}
            url={user?.account?.avatar?.url}
            isCover={false}
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className="mb-4 text-2xl font-semibold text-center mt-14">
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="text-gray-500 ">{user?.bio}</p>
          <p className="text-gray-500">{user?.account?.username}</p>
          {loggedInUser?.account.username !== username && user && (
            <Follow
              toBeFollowedUserId={user?.account._id}
              isFollowing={user.isFollowing}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row flex-wrap justify-center w-full gap-4 mb-6 md:mb-10 md:justify-start md:flex-col md:w-2/12 lg:border-r-slate-100 lg:border-r lg:pr-10 ">
            {links.map((link) => {
              return (
                <Link key={link.id + link.link} to={`${link.link}`}>
                  <Button
                    size="sm"
                    variant={opened === link.link ? "blend" : "moretransparent"}
                    onClick={() => setOpened(link.link)}
                    className={`capitalize border-none hover:underline w-full px-2 lg:text-base ${
                      (link.link === "settings" || link.link === "bookmarks") &&
                      loggedInUser?.account?.username !== user?.account.username
                        ? " hidden"
                        : "  "
                    }`}
                  >
                    <span className="flex md:w-28 lg:w-32 gap-x-6">
                      <span>{link.icon}</span>
                      <span className="hidden md:flex">{link.text}</span>
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="w-full md:w-10/12 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
