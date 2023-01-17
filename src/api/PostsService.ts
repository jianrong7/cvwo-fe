import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Comment } from "../modules/comments/types";
import {
  getCommentsQueryParams,
  updateComments,
  updateIsFetchingComments,
  updateIsFetchingPost,
  updatePost,
} from "../modules/post/postSlice";
import {
  getQueryParams,
  updateIsFetchingPosts,
  updatePosts,
  updateAiPost,
  updateIsFetchingAiPost,
} from "../modules/posts/postsSlice";
import { Post, PostQueryParams } from "../modules/posts/types";
import {
  updateSnackbarContent,
  updateAlertSeverity,
  openSnackbar,
} from "../modules/snackbar/snackbarSlice";
import { PostInput } from "../pages/CreatePost";
import apiClient from "./http-common";

const baseURL = "/posts/";

export const PostsQuery = () => {
  const dispatch = useAppDispatch();
  const queryParams: PostQueryParams = useAppSelector(getQueryParams);
  const fetchPosts = async (context: QueryFunctionContext) => {
    const { tags, sort, search } = context.queryKey[1] as PostQueryParams;
    dispatch(updateIsFetchingPosts(true));
    try {
      const { data } = await apiClient.get(
        `${baseURL}?tags=${tags}&search=${search}`
      );
      const { posts } = data;
      if (sort === "upvotes") {
        const res = posts.sort((a: Post, b: Post) => {
          const ratingA = a.upvotes.length - a.downvotes.length;
          const ratingB = b.upvotes.length - b.downvotes.length;
          return ratingA > ratingB ? -1 : 1;
        });
        return res;
      } else if (sort === "downvotes") {
        const res = posts.sort((a: Post, b: Post) => {
          const ratingA = a.upvotes.length - a.downvotes.length;
          const ratingB = b.upvotes.length - b.downvotes.length;
          return ratingA > ratingB ? 1 : -1;
        });
        return res;
      } else {
        return posts;
      }
    } catch (err) {
      throw err;
    }
  };

  return useQuery(["getAllPosts", queryParams], fetchPosts, {
    onSettled: () => dispatch(updateIsFetchingPosts(false)),
    onSuccess: (data) => dispatch(updatePosts(data.posts)),
  });
};

export const PostQuery = (id: string) => {
  const dispatch = useAppDispatch();

  const fetchPost = async () => {
    dispatch(updateIsFetchingPost(true));
    try {
      const response = await apiClient.get(`/posts/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return useQuery(["getOnePost", id], fetchPost, {
    onSettled: () => dispatch(updateIsFetchingPost(false)),
    onSuccess: (data) => {
      dispatch(updatePost(data.post));
    },
  });
};

export const CommentsFromPostQuery = (postId: string) => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector(getCommentsQueryParams);
  const fetchComments = async () => {
    dispatch(updateIsFetchingComments(true));
    try {
      const { data } = await apiClient.get(`${baseURL}comments/${postId}`);

      const { comments } = data;

      if (sort === "upvotes") {
        const res = comments.sort((a: Comment, b: Comment) => {
          const ratingA = a.upvotes.length - a.downvotes.length;
          const ratingB = b.upvotes.length - b.downvotes.length;
          return ratingA > ratingB ? -1 : 1;
        });
        return res;
      } else if (sort === "downvotes") {
        const res = comments.sort((a: Comment, b: Comment) => {
          const ratingA = a.upvotes.length - a.downvotes.length;
          const ratingB = b.upvotes.length - b.downvotes.length;
          return ratingA > ratingB ? 1 : -1;
        });
        return res;
      } else {
        return comments;
      }
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getComments", postId, sort], fetchComments, {
    onSettled: () => dispatch(updateIsFetchingComments(false)),
    onSuccess: (data) => {
      dispatch(updateComments(data));
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const PostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: PostInput) => {
      try {
        const { data } = await apiClient.post(baseURL, payload, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Post creation unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("getAllPosts");
        queryClient.invalidateQueries(["getOnePost", data.post.ID]);
        navigate(`/post/${data.post.ID}`);

        dispatch(updateSnackbarContent("Successfully created post."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};

export const PostEditMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: { content: string }) => {
      try {
        const { data: response } = await apiClient.put(
          `${baseURL}${postId}`,
          {
            content: payload.content,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Edit post unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["getOnePost", postId.toString()]);
        dispatch(updateSnackbarContent("Successfully edited post."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};

export const PostDeleteMutation = (postId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async () => {
      try {
        const { data: response } = await apiClient.delete(
          `${baseURL}${postId}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Post deletion unsuccessful."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getAllPosts");
        queryClient.invalidateQueries(["getOnePost", postId]);
        dispatch(updateSnackbarContent("Successfully deleted post."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
        navigate("/");
      },
    }
  );
};

export const PostAiMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: { maxTokens: number; prompt: string }) => {
      try {
        const { data: response } = await apiClient.post(
          `${baseURL}ai`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Content generation unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onMutate: () => {
        dispatch(updateIsFetchingAiPost(true));
      },
      onSettled: () => {
        dispatch(updateIsFetchingAiPost(false));
      },
      onSuccess: (data: string) => {
        dispatch(updateAiPost(data));
        dispatch(updateSnackbarContent("Successfully generated content."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};
