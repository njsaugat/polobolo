import { useParams } from "react-router-dom";
import {
  FollowerProfile,
  UserProfile,
} from "../../posts/types/postType";
import React, { useState } from "react";
import getUserByUsername from "../api/getUserByUsername";
import getFollowersList from "../api/getFollowersList";
import { Dialog } from "../../../components/Elements/Dialog";
import PostAuthor from "features/posts/Components/PostAuthor";
import AuthorProfile from "./AuthorProfile";
import UserList from "./UserList";
import { Button } from "../../../components/Elements/Button";

// type UserProfileAboutProps = {
//   user: UserProfile;
// };

function formatDateStringToBirthday(dateString: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions
  );
  return formattedDate;
}
const UserProfileAbout = () => {
  const { username } = useParams();
  const { error, data, isLoading } = getUserByUsername(username);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const user = data?.data;
  return (
    <div className="flex flex-col lg:w-3/4 ">
      <div className="py-3 md:px-9 ">
        {/* Additional User Information */}
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
            <p className="text-gray-500">Followers 🚀</p>
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
            <p className="text-gray-500">Following 👥</p>
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
            <strong>Location:</strong> {user?.location || "Not provided"} 🌍
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${user?.account?.email}`}>
              {user?.account?.email}{" "}
            </a>
            📧
          </p>
          <p>
            <strong>Phone Number:</strong> {user?.phoneNumber || "Not provided"}{" "}
            📞
          </p>
        </div>

        {/* Follower and Following Counts */}
      </div>
      {isFollowersOpen && (
        <UserList
          isOpen={isFollowersOpen}
          closeModal={() => setIsFollowersOpen(false)}
          // data={followersData}
          followers={true}
        />
      )}

      {isFollowingOpen && (
        <UserList
          isOpen={isFollowingOpen}
          closeModal={() => setIsFollowingOpen(false)}
          // data={followingsData}
          followers={false}
        />
      )}
    </div>
  );
};

export default UserProfileAbout;
