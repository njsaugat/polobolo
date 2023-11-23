import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRoutes } from "./routes/AppRouter";
import { Provider } from "react-redux";
import store from "./stores/store";
import { Notifications } from "./components/Notifications/Notifications";
import { SocketProvider } from "./context/SocketContext";
import AnimatedPage from "./components/Shared/AnimatedPage";

const queryClient = new QueryClient();

const RootApp = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
ReactDOM.createRoot(document.getElementById("root")!).render(<RootApp />);
