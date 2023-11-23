import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./features/landing/Components/Navbar";
import { useDispatch } from "react-redux";
import { UserContext } from "./features/posts/context/UserContext";
import { addUser } from "./stores/userSlice";
import getUser from "./features/user/api/getUser";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
  const loggedIn = useAuthCheck();

  if (!loggedIn) {
    return <Outlet />;
  }

  const userData = fetchUserData();

  return (
    <UserContext.Provider value={{ user: userData }}>
      <div className="min-w-full overflow-x-hidden font-montserrat">
        <Navbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const fetchUserData = () => {
  const { isLoading, data } = getUser();
  const dispatch = useDispatch();

  if (!isLoading) {
    dispatch(addUser(data?.data));
  }

  return data?.data;
};

export default App;
