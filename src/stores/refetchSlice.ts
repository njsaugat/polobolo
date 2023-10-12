import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Refetch = ({}: object) => void;

const initialState: { refetch: Refetch } = { refetch: () => {} };

export const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    addRefetch: (state, action: PayloadAction<Refetch>) => {
      state.refetch = action.payload;
    },
  },
});

export const { addRefetch } = refetchSlice.actions;
export default refetchSlice.reducer;
