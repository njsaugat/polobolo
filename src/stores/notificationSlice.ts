import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type Notification = {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
};

const initialState: { notifications: Notification[] } = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) => {
      state.notifications.push({ ...action.payload, id: nanoid() });
    },
    dismissNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
  },
});

export const { addNotification, dismissNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
