import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UserLoginOutput } from "./types";

interface UserState {
  currentUser: UserLoginOutput | null;
  rememberMe: boolean;
  isFetchingUser: boolean;
  viewType: string;
}

const initialState: UserState = {
  currentUser: null,
  rememberMe: true,
  isFetchingUser: false,
  viewType: "posts",
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
    updateViewType: (state, action: PayloadAction<string>) => {
      state.viewType = action.payload;
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
} = usersSlice.actions;

export const getCurrentUser = (state: RootState): UserLoginOutput | null => {
  return state.users.currentUser;
};

export const getRememberMe = (state: RootState): boolean | null => {
  return state.users.rememberMe;
};

export const getViewType = (state: RootState): string => {
  return state.users.viewType;
};

// export const getUserId = (state: RootState): number | undefined => {
//   return state.users.currentUser?.claims?.sub as number;
// };

export default usersSlice.reducer;
