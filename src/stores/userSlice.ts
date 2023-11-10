import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author } from "../features/posts/types/postType";

const initialState: {
  user: Author | undefined;
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  isInitialLogin: boolean;
} = {
  user: undefined,
  isLoggedIn: false,
  isEmailVerified: false,
  isInitialLogin: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Author | undefined>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
    handleLoginUser: (state) => {
      state.isLoggedIn = true;
    },
    handleLogoutUser: (state) => {
      state.isLoggedIn = false;
    },
    handleEmailVerification: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
    },
    handleInitialLogin: (state, action: PayloadAction<boolean>) => {
      state.isInitialLogin = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  handleLoginUser,
  handleLogoutUser,
  handleEmailVerification,
  handleInitialLogin,
} = userSlice.actions;
// export const notificationSelector = (state: RootState) =>
//   state.notification.notificationReducer;
export default userSlice.reducer;
