import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";
import LandingPage from "../src/features/landing/LandingPage";
import Navbar from "./features/landing/Components/Navbar";
import { useDispatch } from "react-redux";
import { UserContext } from "./features/posts/context/UserContext";
import { addUser } from "./stores/userSlice";
import getUser from "./features/home/api/getUser";

const App = () => {
  const { isLoading: isUserLoading, data: userData } = getUser();
  console.log("userdata--->", userData);
  const dispatch = useDispatch();
  dispatch(addUser(userData?.data && userData?.data));

  return (
    <UserContext.Provider value={{ user: userData?.data }}>
      <div className="min-w-full overflow-x-hidden font-montserrat">
        {/* <LandingPage/> */}
        <Navbar />
        <Outlet />
        {/* <div className="flex flex-col h-full text-5xl ">
        Main
      </div> */}
      </div>
    </UserContext.Provider>
  );
};

export default App;
