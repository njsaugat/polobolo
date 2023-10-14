import { Author } from "../../../features/posts/types/postType";
import React, { useState } from "react";
import getUser from "../api/getUser";
import getUserByUsername from "../api/getUserByUsername";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserProfileAbout from "./UserProfileAbout";
import Posts from "../../../features/posts/Components/Posts";
import { Button } from "../../../components/Elements/Button";

export interface UserProfileProps {
  // user?: Author & {
  //   __v: number;
  //   followersCount: number;
  //   followingCount: number;
  //   isFollowing: boolean;
  // };
  userName: string;
}
const links = ["about", "posts"];

const UserProfile = () => {
  const { username } = useParams();
  const [opened, setOpened] = useState("about");
  console.log(username);
  const { error, data, isLoading } = getUserByUsername(username);
  // console.log(user);
  const user = data?.data;
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-11/12 p-4 bg-white rounded-lg shadow-md ">
        {/* Cover Image */}
        <div className="relative mb-4">
          <div className="relative object-cover w-full h-48 rounded-t-lg bg-theme-color bg-gradient-to-r from-teal-200 to-teal-500">
            <h3 className="absolute text-5xl text-white lowercase -translate-x-1/2 -translate-y-1/2 md:uppercase left-1/2 font-cursive top-1/2">
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}{" "}
            </h3>
          </div>
          {/* User Avatar */}
          <img
            src={user?.account?.avatar?.url}
            alt="Avatar"
            className="absolute bottom-0 w-20 h-20 transform -translate-x-1/2 translate-y-1/2 border-4 border-white rounded-full left-1/2"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-semibold text-center mt-14">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-500 ">{user?.bio}</p>
          <p className="text-gray-500">{user?.account?.username}</p>
        </div>

        {links.map((link) => {
          return (
            <Link to={`${link}`} key={link} onClick={() => setOpened(link)}>
              <Button className="case">{link}</Button>
            </Link>
          );
        })}
        {opened === "about" && user && <UserProfileAbout user={user} />}
        {opened === "link" && <Posts username={username} />}
        {/* {user && <UserProfileAbout user={user} />} */}
        {/* <Outlet /> */}

        {/* User Info */}
      </div>
    </div>
  );
};

export default UserProfile;
