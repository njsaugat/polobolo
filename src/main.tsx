import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/Components/Login";
import Signup from "./features/auth/Components/Signup";
import ErrorElement from "./components/Shared/ErrorElement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRoutes } from "./routes/AppRouter";
import { Provider } from "react-redux";
import store from "./stores/store";
import { Notifications } from "./components/Notifications/Notifications";
import { SocketProvider } from "./context/SocketContext";
import AnimatedPage from "./components/Shared/AnimatedPage";

type RootAppProviderProps = {
  children: React.ReactNode;
};
const RootApp = ({ children }: RootAppProviderProps) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Notifications />
      {/* <Router>{children}</Router> */}
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RootApp>{/* <AppRoutes /> */}</RootApp>
);
