import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface UserState {
  tags: string[];
}

const initialState: UserState = {
  tags: ["gossip", "golang", "nus", "react", "typescript", "cvwo"],
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { updateSearchTags, updateSearchText } = homeSlice.actions;

export const getTags = (state: RootState): string[] => {
  return state.home.tags;
};

export default homeSlice.reducer;
