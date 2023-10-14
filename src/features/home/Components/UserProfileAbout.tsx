import { UserProfile } from "../../../features/posts/types/postType";
import React from "react";
type UserProfileAboutProps = {
  user: UserProfile;
};
const UserProfileAbout = ({ user }: UserProfileAboutProps) => {
  return (
    <>
      {/* Additional User Information */}
      <div className="flex flex-col flex-wrap gap-10 fmt-4">
        <p>
          <strong>Username:</strong> {user?.account?.username}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user?.dob || "Not provided"}
        </p>
        <p>
          <strong>Location:</strong> {user?.location || "Not provided"}
        </p>
        <p>
          <strong>Email:</strong> {user?.account?.email}
        </p>
      </div>

      {/* Follower and Following Counts */}
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-lg font-semibold">{user?.followersCount}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{user?.followingCount}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div>
    </>
  );
};

export default UserProfileAbout;
