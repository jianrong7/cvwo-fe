import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Post, PostQueryParams } from "./types";

interface PostState {
  postData: Post | null;
  postsData: Post[] | null;
  queryParams: PostQueryParams;
  isFetchingPost: boolean;
  isFetchingPosts: boolean;
  aiPost: string;
  isFetchingAiPost: boolean;
}

const initialState: PostState = {
  postData: null,
  postsData: null,
  queryParams: { tags: "", sort: "created_at", search: "" },
  isFetchingPost: false,
  isFetchingPosts: false,
  aiPost: "",
  isFetchingAiPost: false,
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
    updateQueryParamsSearch: (state, action: PayloadAction<string>) => {
      state.queryParams = { ...state.queryParams, search: action.payload };
    },
    resetQueryParamsState: (state) => {
      state.queryParams = { tags: "", sort: "created_at", search: "" };
    },
    updateAiPost: (state, action: PayloadAction<string>) => {
      state.aiPost = action.payload;
    },
    updateIsFetchingAiPost: (state, action: PayloadAction<boolean>) => {
      state.isFetchingAiPost = action.payload;
    },
  },
});

export const {
  updatePost,
  updateIsFetchingPost,
  updatePosts,
  updateIsFetchingPosts,
  updateQueryParamsTags,
  updateQueryParamsSort,
  updateQueryParamsSearch,
  resetQueryParamsState,
  updateAiPost,
  updateIsFetchingAiPost,
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

export const getAiPost = (state: RootState): string => {
  return state.posts.aiPost;
};

export const getIsFetchingAiPost = (state: RootState): boolean => {
  return state.posts.isFetchingAiPost;
};

export default postsSlice.reducer;
