import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import Navbar from "./features/landing/Components/Navbar";
import getUser from "./features/user/api/getUser";
import useAuthCheck from "./hooks/useAuthCheck";
import { addUser } from "./stores/userSlice";

const App = () => {
  const loggedIn = useAuthCheck();

  if (!loggedIn) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  const { isLoading, userData } = fetchUserData();

  return (
    <SocketProvider>
      <div className="min-w-full overflow-x-hidden font-montserrat">
        <Navbar
          user={userData}
          isLoggedIn={loggedIn}
          isLoading={isLoading ?? true}
        />
        <Outlet />
      </div>
    </SocketProvider>
  );
};

const fetchUserData = () => {
  const { isLoading, data } = getUser();
  const dispatch = useDispatch();

  if (!isLoading) {
    dispatch(addUser(data?.data));
  }

  return { userData: data?.data, isLoading };
};

export default App;
