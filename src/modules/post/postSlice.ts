import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Comment } from "../comments/types";
import { Post } from "../posts/types";

interface PostState {
  postData: Post | null;
  isFetchingPost: boolean;
  comments: Comment[] | null;
  isFetchingComments: boolean;
  commentsQueryParams: { sort: string };
}

const initialState: PostState = {
  postData: null,
  isFetchingPost: false,
  comments: null,
  isFetchingComments: false,
  commentsQueryParams: { sort: "created_at" },
};

export const postSlice = createSlice({
  name: "post",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<Post>) => {
      state.postData = action.payload;
    },
    updateIsFetchingPost: (state, action: PayloadAction<boolean>) => {
      state.isFetchingPost = action.payload;
    },
    updateComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    updateIsFetchingComments: (state, action: PayloadAction<boolean>) => {
      state.isFetchingComments = action.payload;
    },
    updateCommentsQueryParams: (state, action: PayloadAction<string>) => {
      state.commentsQueryParams = { sort: action.payload };
    },
    resetQueryParamsState: (state) => {
      state.commentsQueryParams = { sort: "created_at" };
    },
  },
});

export const {
  updatePost,
  updateIsFetchingPost,
  updateComments,
  updateIsFetchingComments,
  updateCommentsQueryParams,
  resetQueryParamsState,
} = postSlice.actions;

export const getPost = (state: RootState): Post | null => {
  return state.post.postData;
};

export const getComments = (state: RootState): Comment[] | null => {
  return state.post.comments;
};

export const getCommentsQueryParams = (state: RootState): { sort: string } => {
  return state.post.commentsQueryParams;
};

export default postSlice.reducer;
