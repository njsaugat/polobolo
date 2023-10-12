import React from "react";

export interface UserProfileProps {
  user?: {
    _id: string;
    coverImage: {
      url: string;
      localPath: string;
      _id: string;
    };
    firstName: string;
    lastName: string;
    bio: string;
    dob: string | null;
    location: string;
    countryCode: string;
    phoneNumber: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    account: {
      _id: string;
      avatar: {
        url: string;
        localPath: string;
        _id: string;
      };
      username: string;
      email: string;
      isEmailVerified: boolean;
    };
    followersCount: number;
    followingCount: number;
    isFollowing: boolean;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-11/12 p-4 bg-white rounded-lg shadow-md ">
        {/* Cover Image */}
        <div className="relative mb-4">
          <div className="relative object-cover w-full h-48 rounded-t-lg bg-theme-color bg-gradient-to-r from-teal-200 to-teal-500">
            <h3 className="absolute text-5xl text-white lowercase -translate-x-1/2 -translate-y-1/2 md:uppercase left-1/2 font-cursive top-1/2">
              {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}{" "}
            </h3>
          </div>
          {/* User Avatar */}
          <img
            src={user?.account?.avatar?.url}
            alt="Avatar"
            className="absolute bottom-0 w-20 h-20 transform -translate-x-1/2 translate-y-1/2 border-4 border-white rounded-full left-1/2"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center">

        <h1 className="mb-4 text-2xl font-semibold text-center mt-14">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-500 ">{user?.bio}</p>
        <p className="text-gray-500">{user?.account?.username}</p>
        </div>

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
      </div>
    </div>
  );
};

export default UserProfile;
