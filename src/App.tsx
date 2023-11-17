import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./components/Shared/Logo";
import LandingPage from "../src/features/landing/LandingPage";
import Navbar from "./features/landing/Components/Navbar";
import { useDispatch } from "react-redux";
import { UserContext } from "./features/posts/context/UserContext";
import { addUser } from "./stores/userSlice";
import getUser from "./features/user/api/getUser";
import { LocalStorage } from "./utils";
import useAuthCheck from "./hooks/useAuthCheck";

const MemoNavbar = React.memo(Navbar);
const App = () => {
  const loggedIn = useAuthCheck();
  if (!loggedIn) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  const { isLoading: isUserLoading, data: userData } = getUser();
  const dispatch = useDispatch();
  dispatch(addUser(userData?.data && userData?.data));

  return (
    <UserContext.Provider value={{ user: userData?.data }}>
      <div className="min-w-full overflow-x-hidden font-montserrat">
        <MemoNavbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default App;
