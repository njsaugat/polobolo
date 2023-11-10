import { Author } from "../../posts/types/postType";
import { useEffect, useState } from "react";
import getUserByUsername from "../api/getUserByUsername";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Elements/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import ShimmerProfile from "../../../components/Shimmer/ShimmerProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import LoadImage from "../../../components/Elements/LoadImage";
import Follow from "./Follow";
import UploadProfileImage from "./UploadProfileImage";
import { links } from "../../../utils/navbarLinks";

export interface UserProfileProps {
  userName: string;
}

const UserProfile = () => {
  const { username } = useParams();
  const { pathname } = useLocation();
  const [opened, setOpened] = useState("about");
  const [isHovered, setIsHovered] = useState(false);
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [isCoverImageUploadOpen, setIsCoverImageUploadOpen] = useState(false);
  const closeModal = () => {
    setIsImageUploadOpen(false);
  };
  const closeModalCover = () => {
    setIsCoverImageUploadOpen(false);
  };
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
        {/* Cover Image */}
        <div className="relative mb-4">
          <div
            className="relative object-cover w-full h-56 transition-all rounded-t-lg duration-800 md:h-48 lg:h-72 bg-theme-color bg-gradient-to-r from-teal-200 to-teal-500"
            onMouseEnter={() => setIsCoverHovered(true)}
            onMouseLeave={() => setIsCoverHovered(false)}
            onClick={() =>
              loggedInUser?.account.username === username
                ? setIsCoverImageUploadOpen(true)
                : setIsCoverImageUploadOpen(false)
            }
          >
            {user?.coverImage.url.includes("placeholder") ? (
              <h3 className="absolute text-5xl text-white lowercase -translate-x-1/2 -translate-y-1/2 md:uppercase left-1/2 font-cursive top-1/2">
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}{" "}
              </h3>
            ) : (
              <LoadImage
                src={user?.coverImage?.url}
                alt="Cover Image"
                className="absolute object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 cursor-pointer md:uppercase left-1/2 top-1/2"
              />
            )}

            {isCoverHovered && loggedInUser?.account.username === username && (
              <div className="absolute w-full h-full cursor-pointer bg-gradient-to-t from-transparent to-gray-300">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="absolute text-5xl translate-x-1/2 translate-y-1/2 text-slate-800 bottom-1/2 right-1/2"
                />
              </div>
            )}
          </div>
          <div
            className="absolute bottom-0 w-40 h-40 mb-2 transition-all duration-300 transform -translate-x-1/2 translate-y-1/2 border-4 rounded-full cursor-pointer border-slate-200 lg:translate-y-3/4 lg:w-40 lg:h-40 lg:mb-16 left-1/2 "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() =>
              loggedInUser?.account.username === username
                ? setIsImageUploadOpen(true)
                : setIsImageUploadOpen(false)
            }
          >
            <LoadImage
              src={user?.account?.avatar?.url}
              alt="Avatar"
              className="object-cover w-full h-full rounded-full "
            />
            {isHovered && loggedInUser?.account.username === username && (
              <div className="h-full -translate-y-full rounded-full cursor-pointer bg-gradient-to-b from-transparent to-slate-600">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="absolute text-2xl translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2 text-slate-100"
                />
              </div>
            )}
          </div>
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
                      <span className="hidden md:flex">{link.link}</span>
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="w-full md:w-10/12 ">
            <Outlet />
          </div>

          {isImageUploadOpen && (
            <UploadProfileImage
              isImageUploadOpen={isImageUploadOpen}
              closeModal={closeModal}
              title={"Upload your profile picture 📷"}
              coverImageExist={false}
            />
          )}
          {isCoverImageUploadOpen && (
            <UploadProfileImage
              isImageUploadOpen={isCoverImageUploadOpen}
              closeModal={closeModalCover}
              title={"Upload your cover image 📷"}
              coverImageExist={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
