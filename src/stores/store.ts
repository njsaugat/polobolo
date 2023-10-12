import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import refetchReducer from "./refetchSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    refetch: refetchReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
