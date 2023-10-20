import Posts from "../posts/Components/Posts";
import React from "react";
import getUser from "./api/getUser";
import { useDispatch } from "react-redux";
import { addUser } from "../../stores/userSlice";
import { UserContext } from "../posts/context/UserContext";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Outlet />;{/* </UserContext.Provider> */}
    </>
  );
};

export default Home;
