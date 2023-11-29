import { useParams } from "react-router-dom";
import React, { useState } from "react";
import getUserByUsername from "../api/getUserByUsername";
import UserList from "./UserList";
import { formatDateStringToBirthday } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";

const UserProfileAbout = () => {
  const { username } = useParams();
  const { error, data, isLoading } = getUserByUsername(username);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const { t } = useTranslation();
  const user = data?.data;
  return (
    <div className="flex flex-col lg:w-3/4 ">
      <div className="py-3 md:px-9 ">
        <div className="flex justify-between mt-4 mb-5">
          <div
            onClick={() =>
              user && user?.followersCount > 0 && setIsFollowersOpen(true)
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
              user && user?.followingCount > 0 && setIsFollowingOpen(true)
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
            <strong>Date of Birth:</strong>{" "}
            {(user?.dob && formatDateStringToBirthday(user?.dob)) ||
              "Not provided"}{" "}
            🎂
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {user?.location || t("userPages.notProvided")} 🌍
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${user?.account?.email}`}>
              {user?.account?.email}{" "}
            </a>
            📧
          </p>
          <p>
            <strong>Phone Number:</strong>{" "}
            {user?.phoneNumber || t("userPages.notProvided")} 📞
          </p>
        </div>
      </div>
      {isFollowersOpen && (
        <UserList
          isOpen={isFollowersOpen}
          closeModal={() => setIsFollowersOpen(false)}
          followers={true}
        />
      )}

      {isFollowingOpen && (
        <UserList
          isOpen={isFollowingOpen}
          closeModal={() => setIsFollowingOpen(false)}
          followers={false}
        />
      )}
    </div>
  );
};

export default UserProfileAbout;
