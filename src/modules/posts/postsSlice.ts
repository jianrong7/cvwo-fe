import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Post } from "./types";

interface PostState {
  posts: Post[] | null;
  isFetchingPosts: boolean;
}

const initialState: PostState = {
  posts: null,
  isFetchingPosts: false,
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    updateIsFetchingPosts: (state, action: PayloadAction<boolean>) => {
      state.isFetchingPosts = action.payload;
    },
    // updateCurrentUser: (state, action: PayloadAction<UserData>) => {
    //   state.currentUser = action.payload;
    // },
    // removeCurrentUser: (state) => {
    //   state.currentUser = null;
    // },
  },
});

export const { updatePosts, updateIsFetchingPosts } = postsSlice.actions;

// export const getCurrentUser = (state: RootState): UserData | null => {
//   return state.users.currentUser;
// };

// export const getIsFetchingUser = (state: RootState): boolean => {
//   return state.users.isFetchingUser;
// };

// export const getUserTier = (state: RootState): UserTier | undefined => {
//   return state.users.currentUser?.tier as UserTier;
// };

export default postsSlice.reducer;
