import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UserData } from "./types";

interface UserState {
  currentUser: UserData | null;
  isFetchingUser: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isFetchingUser: false,
};

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
    updateIsFetchingUser: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUser = action.payload;
    },
  },
});

export const { updateCurrentUser, removeCurrentUser, updateIsFetchingUser } =
  usersSlice.actions;

export const getCurrentUser = (state: RootState): UserData | null => {
  return state.users.currentUser;
};

// export const getIsFetchingUser = (state: RootState): boolean => {
//   return state.users.isFetchingUser;
// };

// export const getUserTier = (state: RootState): UserTier | undefined => {
//   return state.users.currentUser?.tier as UserTier;
// };

export default usersSlice.reducer;
