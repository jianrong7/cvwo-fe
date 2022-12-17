import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Post, PostQueryParams } from "./types";

interface PostState {
  postData: Post | null;
  postsData: Post[] | null;
  queryParams: PostQueryParams;
  isFetchingPost: boolean;
  isFetchingPosts: boolean;
}

const initialState: PostState = {
  postData: null,
  postsData: null,
  queryParams: { tags: "", order: "", sort: "", search: "" },
  isFetchingPost: false,
  isFetchingPosts: false,
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<Post>) => {
      state.postData = action.payload;
    },
    updateIsFetchingPost: (state, action: PayloadAction<boolean>) => {
      state.isFetchingPost = action.payload;
    },
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
    updateQueryParamsSearch: (state, action: PayloadAction<string>) => {
      state.queryParams = { ...state.queryParams, search: action.payload };
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
  updatePost,
  updateIsFetchingPost,
  updatePosts,
  updateIsFetchingPosts,
  updateQueryParamsTags,
  updateQueryParamsSort,
  updateQueryParamsOrder,
  updateQueryParamsSearch,
} = postsSlice.actions;

export const getQueryParams = (state: RootState): PostQueryParams => {
  return state.posts.queryParams;
};

export const getQueryParamsTags = (state: RootState): string => {
  return state.posts.queryParams.tags;
};

export const getCurPost = (state: RootState): Post | null => {
  return state.posts.postData;
};

export default postsSlice.reducer;
