import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/routes/Login";
import Signup from "./features/auth/routes/Signup";
import ErrorElement from "./components/ErrorElement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import appRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import store from "./stores/store";
import { Notifications } from "./components/Notifications/Notifications";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Notifications/>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  // </React.StrictMode>
);
