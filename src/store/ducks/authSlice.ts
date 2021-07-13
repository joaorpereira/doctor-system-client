import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  page: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupPage(state, action: PayloadAction<string>) {
      return { ...state, page: action.payload };
    },
  },
});

export const { setSignupPage } = authSlice.actions;

export default authSlice.reducer;
