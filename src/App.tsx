import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./features/landing/Components/Navbar";
import { useDispatch } from "react-redux";
import { UserContext } from "./features/posts/context/UserContext";
import { addUser } from "./stores/userSlice";
import getUser from "./features/user/api/getUser";
import useAuthCheck from "./hooks/useAuthCheck";
import { SocketProvider } from "./context/SocketContext";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackErrorBoundary } from "./components/Shared/FallbackErrorBoundary";

const App = () => {
  const loggedIn = useAuthCheck();

  if (!loggedIn) {
    return <Outlet />;
  }

  const userData = fetchUserData();

  return (
    <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
      <SocketProvider>
        <div className="min-w-full overflow-x-hidden font-montserrat">
          <Navbar user={userData} isLoggedIn={loggedIn} />
          <Outlet />
        </div>
      </SocketProvider>
    </ErrorBoundary>
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
