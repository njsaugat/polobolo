import Posts from "../../features/posts/Components/Posts";
import React from "react";
import getUser from "./api/getUser";
import { useDispatch } from "react-redux";
import { addUser } from "../../stores/userSlice";
import { UserContext } from "../../features/posts/context/UserContext";

const Home = () => {
  return (
    <>
      <Posts />;{/* </UserContext.Provider> */}
    </>
  );
};

export default Home;
