import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: "", password: "" },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser(state, { payload }) {
      state.user.email = payload.email;
      state.user.password = payload.password;
    },
    logIn(state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.user = { email: "", password: "" };
      state.isLoggedIn = false;
    },
  },
});

export const { createUser, logIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
