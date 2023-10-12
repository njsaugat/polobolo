import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author } from "../features/posts/types/postType";

const initialState: { user: Author | undefined } = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Author | undefined>) => {
      state.user = action.payload;
    },
    removeUser: (state, action: PayloadAction<Author>) => {
      state.user = undefined;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
// export const notificationSelector = (state: RootState) =>
//   state.notification.notificationReducer;
export default userSlice.reducer;
