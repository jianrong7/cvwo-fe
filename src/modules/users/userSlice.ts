import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UserModel, UserLoginOutput } from "./types";

interface UserState {
  currentUser: UserLoginOutput | null;
  rememberMe: boolean;
  isFetchingUser: boolean;
  viewType: string;
  userData: UserModel | null;
}

const initialState: UserState = {
  currentUser: null,
  rememberMe: true,
  isFetchingUser: false,
  viewType: "posts",
  userData: null,
};

export const usersSlice = createSlice({
  name: "user",
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
    updateViewType: (state, action: PayloadAction<string>) => {
      state.viewType = action.payload;
    },
    updateUserData: (state, action: PayloadAction<UserModel>) => {
      state.userData = action.payload;
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
  updateViewType,
  updateUserData,
} = usersSlice.actions;

export const getCurrentUser = (state: RootState): UserLoginOutput | null => {
  return state.user.currentUser;
};

export const getRememberMe = (state: RootState): boolean | null => {
  return state.user.rememberMe;
};

export const getViewType = (state: RootState): string => {
  return state.user.viewType;
};

export const getUserData = (state: RootState): UserModel | null => {
  return state.user.userData;
};

export default usersSlice.reducer;
