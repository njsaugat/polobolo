import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { formatDateStringToBirthday } from "../../../utils/helpers";
import getUserByUsername from "../api/getUserByUsername";
import UserList from "./UserList";

const UserProfileAbout = () => {
  const { username } = useParams();
  const { error, data, isLoading } = getUserByUsername(username);
  const {
    isOpen: isFollowersOpen,
    open: openFollowersModal,
    close: closeFollowersModal,
  } = useDisclosure(false);
  const {
    isOpen: isFollowingOpen,
    open: openFollowingModal,
    close: closeFollowingModal,
  } = useDisclosure(false);
  const { t } = useTranslation();
  const user = data?.data;
  return (
    <div className="flex flex-col lg:w-3/4 ">
      <div className="py-3 md:px-9 ">
        <div className="flex justify-between mt-4 mb-5">
          <div
            onClick={() =>
              user && user?.followersCount > 0 && openFollowersModal()
            }
            className={
              user && user?.followersCount > 0
                ? "cursor-pointer"
                : "cursor-default"
            }
          >
            <p className="text-lg font-semibold">{user?.followersCount}</p>
            <p className="text-gray-500">{t("userPages.followers")} 🚀</p>
          </div>
          <div
            onClick={() =>
              user && user?.followingCount > 0 && openFollowingModal()
            }
            className={
              user && user?.followingCount > 0
                ? "cursor-pointer"
                : "cursor-default"
            }
          >
            <p className="text-lg font-semibold">{user?.followingCount}</p>
            <p className="text-gray-500">{t("userPages.following")} 👥</p>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-10 fmt-4">
          <p>
            <strong>Username:</strong> {user?.account?.username} 📛
          </p>
          <p>
            <strong>{t("userPages.dob")}:</strong>{" "}
            {(user?.dob && formatDateStringToBirthday(user?.dob)) ||
              "Not provided"}{" "}
            🎂
          </p>
          <p>
            <strong>{t("userPages.location")}:</strong>{" "}
            {user?.location || t("userPages.notProvided")} 🌍
          </p>
          <p>
            <strong>{t("authPage.email")}:</strong>{" "}
            <a href={`mailto:${user?.account?.email}`}>
              {user?.account?.email}{" "}
            </a>
            📧
          </p>
          <p>
            <strong>{t("userPages.phoneNumber")}:</strong>{" "}
            {user?.phoneNumber || t("userPages.notProvided")} 📞
          </p>
        </div>
      </div>
      {isFollowersOpen && (
        <UserList
          isOpen={isFollowersOpen}
          closeModal={closeFollowersModal}
          followers={true}
        />
      )}

      {isFollowingOpen && (
        <UserList
          isOpen={isFollowingOpen}
          closeModal={closeFollowingModal}
          followers={false}
        />
      )}
    </div>
  );
};

export default UserProfileAbout;
