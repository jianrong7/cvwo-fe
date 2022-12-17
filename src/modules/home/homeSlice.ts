import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface UserState {
  searchTags: string[];
  searchText: string[];
  tags: string[];
}

const initialState: UserState = {
  searchTags: [],
  searchText: [],
  tags: ["gossip", "golang", "nus", "react", "typescript", "cvwo"],
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSearchTags: (state, action: PayloadAction<string[]>) => {
      // const arrCopy = [...state.searchTags]
      // arrCopy.push(action.payload);
      // state.searchTags = arrCopy;
      state.searchTags = action.payload;
    },
    updateSearchText: (state, action: PayloadAction<string[]>) => {
      // const arrCopy = [...state.searchText]
      // arrCopy.push(action.payload);
      // state.searchText = arrCopy;
      state.searchText = action.payload;
    },
  },
});

export const { updateSearchTags, updateSearchText } = homeSlice.actions;

export const getTags = (state: RootState): string[] => {
  return state.home.tags;
};

export const getSearchTags = (state: RootState): string[] => {
  return state.home.searchTags;
};

export const getSearchText = (state: RootState): string[] => {
  return state.home.searchText;
};

// export const getRememberMe = (state: RootState): boolean | null => {
//   return state.users.rememberMe;
// };

// export const getIsFetchingUser = (state: RootState): boolean => {
//   return state.users.isFetchingUser;
// };

// export const getUserId = (state: RootState): number | undefined => {
//   return state.users.currentUser?.claims?.sub as number;
// };

export default homeSlice.reducer;
