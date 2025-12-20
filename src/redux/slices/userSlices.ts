import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  pendingVerificationEmail: string | null;
  resetPasswordEmail: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  email: null,
  pendingVerificationEmail: null,
  resetPasswordEmail: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.pendingVerificationEmail = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.pendingVerificationEmail = null;
    },
    setVerificationEmail: (state, action: PayloadAction<string>) => {
      state.pendingVerificationEmail = action.payload;
    },
    clearVerificationEmail: (state) => {
      state.pendingVerificationEmail = null;
    },
    setResetPasswordEmail: (state, action: PayloadAction<string>) => {
      state.resetPasswordEmail = action.payload;
    },
    clearResetPasswordEmail: (state) => {
      state.resetPasswordEmail = null;
    },
  },
});

export const {
  login,
  logout,
  setVerificationEmail,
  clearVerificationEmail,
  setResetPasswordEmail,
  clearResetPasswordEmail,
} = userSlice.actions;

export default userSlice.reducer;
