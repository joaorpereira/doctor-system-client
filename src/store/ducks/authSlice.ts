/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Worker } from "./workersSlice";
import { Client } from "./clientsSlice";
import { Company } from "./companiesSlice";
import { key } from "../../utils";

export interface AuthSliceState {
  page: string;
  loading: boolean;
  user: Worker | Client | Company | Record<string, any> | any;
  success: boolean;
  token: null;
}

const initialState: AuthSliceState = {
  page: "",
  loading: false,
  user: {},
  success: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupPage(state, action: PayloadAction<string>) {
      return { ...state, page: action.payload };
    },
    requestLogin(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    requestLogout() {
      localStorage.removeItem(key);
      return initialState;
    },
    requestLoginSuccess(state, action: PayloadAction<any>) {
      const user = action.payload.user;
      const token = action.payload.token;
      return {
        ...state,
        loading: true,
        user: user,
        success: true,
        token: token,
      };
    },
  },
});

export const {
  setSignupPage,
  requestLogin,
  requestLogout,
  requestLoginSuccess,
} = authSlice.actions;

export default authSlice.reducer;
