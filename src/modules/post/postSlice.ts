import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Post } from "../posts/types";

interface PostState {
  postData: Post | null;
  isFetchingPost: boolean;
  comments: Comment[] | null;
  isFetchingComments: boolean;
}

const initialState: PostState = {
  postData: null,
  isFetchingPost: false,
  comments: null,
  isFetchingComments: false,
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
    updateComments: (state, action: PayloadAction<any>) => {
      state.comments = action.payload;
    },
    updateIsFetchingComments: (state, action: PayloadAction<boolean>) => {
      state.isFetchingComments = action.payload;
    },
  },
});

export const {
  updatePost,
  updateIsFetchingPost,
  updateComments,
  updateIsFetchingComments,
} = postSlice.actions;

export const getPost = (state: RootState): Post | null => {
  return state.post.postData;
};

export const getComments = (state: RootState): Comment[] | null => {
  return state.post.comments;
};

export default postSlice.reducer;
