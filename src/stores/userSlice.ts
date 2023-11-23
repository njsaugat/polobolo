import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author } from "../features/posts/types/postType";

const initialState: {
  user: Author | undefined;
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  isInitialLogin: boolean;
  updatedProfilePicURL: string | undefined;
} = {
  user: undefined,
  isLoggedIn: false,
  isEmailVerified: false,
  isInitialLogin: true,
  updatedProfilePicURL: undefined,
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
    handleUpdateProfilePic: (state, action: PayloadAction<string>) => {
      state.updatedProfilePicURL = action.payload;
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
  handleUpdateProfilePic,
} = userSlice.actions;
export default userSlice.reducer;
