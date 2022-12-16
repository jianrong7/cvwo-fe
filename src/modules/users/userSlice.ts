import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UserLoginOutput } from "./types";

interface UserState {
  currentUser: UserLoginOutput | null;
  rememberMe: boolean;
  isFetchingUser: boolean;
}

const initialState: UserState = {
  currentUser: null,
  rememberMe: true,
  isFetchingUser: false,
};

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<UserLoginOutput>) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
    updateIsFetchingUser: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUser = action.payload;
    },
    updateRememberMeToTrue: (state) => {
      state.rememberMe = true;
    },
    updateRememberMeToFalse: (state) => {
      state.rememberMe = false;
    },
    updateRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
  },
});

export const {
  updateCurrentUser,
  removeCurrentUser,
  updateIsFetchingUser,
  updateRememberMeToTrue,
  updateRememberMeToFalse,
  updateRememberMe,
} = usersSlice.actions;

export const getCurrentUser = (state: RootState): UserLoginOutput | null => {
  return state.users.currentUser;
};

export const getRememberMe = (state: RootState): boolean | null => {
  return state.users.rememberMe;
};

// export const getIsFetchingUser = (state: RootState): boolean => {
//   return state.users.isFetchingUser;
// };

// export const getUserId = (state: RootState): number | undefined => {
//   return state.users.currentUser?.claims?.sub as number;
// };

export default usersSlice.reducer;
