import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../modules/posts/postsSlice";
import userReducer from "../modules/users/userSlice";
import snackbarReducer from "../modules/snackbar/snackbarSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;