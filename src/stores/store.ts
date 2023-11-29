import { Middleware, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import refetchReducer from "./refetchSlice";
import userSlice from "./userSlice";

const loggerMiddleware: Middleware = () => (next) => (action) => {
  console.log("Dispatching action:", action);
  return next(action);
};

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    refetch: refetchReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
