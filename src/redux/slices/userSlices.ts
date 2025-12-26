import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  token?: string | null;
  userId?: string | null;
  pendingVerificationEmail: string | null;
  resetPasswordEmail: string | null;
}

// Check localStorage for existing token on initialization
const storedToken = localStorage.getItem("token");
const storedEmail = localStorage.getItem("userEmail");
const storedUserId = localStorage.getItem("userId");

const initialState: UserState = {
  isAuthenticated: !!storedToken,
  email: storedEmail,
  token: storedToken,
  pendingVerificationEmail: null,
  resetPasswordEmail: null,
  userId: storedUserId,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; token?: string; userId: string }>
    ) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.token || null;
      state.pendingVerificationEmail = null;
      state.userId = action.payload.userId;
      // Store email in localStorage for persistent login
      if (action.payload.userId) {
        localStorage.setItem("userId", action.payload.userId);
      }
      if (action.payload.email) {
        localStorage.setItem("userEmail", action.payload.email);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.token = null;
      state.userId = null;
      state.pendingVerificationEmail = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
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
