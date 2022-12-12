import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Post, PostQueryParams } from "./types";

interface PostState {
  postsData: Post[] | null;
  queryParams: PostQueryParams;
  isFetchingPosts: boolean;
}

const initialState: PostState = {
  postsData: null,
  queryParams: { tags: "", order: "", sort: "" },
  isFetchingPosts: false,
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.postsData = action.payload;
    },
    updateIsFetchingPosts: (state, action: PayloadAction<boolean>) => {
      state.isFetchingPosts = action.payload;
    },
    updateQueryParamsTags: (state, action: PayloadAction<string>) => {
      state.queryParams = { ...state.queryParams, tags: action.payload };
    },
    updateQueryParamsSort: (state, action: PayloadAction<string>) => {
      state.queryParams = { ...state.queryParams, sort: action.payload };
    },
    updateQueryParamsOrder: (state, action: PayloadAction<string>) => {
      state.queryParams = { ...state.queryParams, order: action.payload };
    },
    // updateCurrentUser: (state, action: PayloadAction<UserData>) => {
    //   state.currentUser = action.payload;
    // },
    // removeCurrentUser: (state) => {
    //   state.currentUser = null;
    // },
  },
});

export const {
  updatePosts,
  updateIsFetchingPosts,
  updateQueryParamsTags,
  updateQueryParamsSort,
  updateQueryParamsOrder,
} = postsSlice.actions;

export const getQueryParams = (state: RootState): PostQueryParams => {
  return state.posts.queryParams;
};

export const getQueryParamsTags = (state: RootState): string => {
  return state.posts.queryParams.tags;
};

// export const getUserTier = (state: RootState): UserTier | undefined => {
//   return state.users.currentUser?.tier as UserTier;
// };

export default postsSlice.reducer;
