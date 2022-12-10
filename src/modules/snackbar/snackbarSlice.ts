import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SnackbarState {
  snackbarContent: string;
  alertSeverity: AlertColor;
  isSnackbarOpen: boolean;
  autoHideDuration: number;
}

const initialState: SnackbarState = {
  snackbarContent: "",
  alertSeverity: "success",
  isSnackbarOpen: false,
  autoHideDuration: 6000,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSnackbarContent: (state, action: PayloadAction<any>) => {
      state.snackbarContent = action.payload;
    },
    toggleIsSnackbarOpen: (state) => {
      state.isSnackbarOpen = !state.isSnackbarOpen;
    },
    // updateCurrentUser: (state, action: PayloadAction<UserData>) => {
    //   state.currentUser = action.payload;
    // },
    // removeCurrentUser: (state) => {
    //   state.currentUser = null;
    // },
  },
});

export const { updateSnackbarContent, toggleIsSnackbarOpen } =
  snackbarSlice.actions;

export const getSnackbar = (state: RootState): SnackbarState | null => {
  return state.snackbar;
};

// export const getIsFetchingUser = (state: RootState): boolean => {
//   return state.users.isFetchingUser;
// };

// export const getUserTier = (state: RootState): UserTier | undefined => {
//   return state.users.currentUser?.tier as UserTier;
// };

export default snackbarSlice.reducer;
