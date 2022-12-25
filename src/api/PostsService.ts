import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
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
import apiClient from "./http-common";

const baseURL = "/posts/";

export const PostsQuery = () => {
  const dispatch = useAppDispatch();
  const queryParams: PostQueryParams = useAppSelector(getQueryParams);
  const fetchPosts = async (context: any) => {
    const { tags, sort, search } = context.queryKey[1];
    dispatch(updateIsFetchingPosts(true));
    const response = await apiClient.get(
      `${baseURL}?tags=${tags}&search=${search}`
    );
    const { posts } = response.data;
    if (sort === "upvotes") {
      const res = posts.sort((a: Post, b: Post) => {
        const ratingA = a.upvotes.length - a.downvotes.length;
        const ratingB = b.upvotes.length - b.downvotes.length;
        return ratingA > ratingB ? 1 : -1;
      });
      return res;
    } else if (sort === "downvotes") {
      const res = posts.sort((a: Post, b: Post) => {
        const ratingA = a.upvotes.length - a.downvotes.length;
        const ratingB = b.upvotes.length - b.downvotes.length;
        return ratingA > ratingB ? -1 : 1;
      });
      return res;
    } else {
      return posts;
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
  const fetchComments = async () => {
    dispatch(updateIsFetchingComments(true));
    try {
      const response = await apiClient.get(`${baseURL}comments/${postId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getComments", postId], fetchComments, {
    onSettled: () => dispatch(updateIsFetchingComments(false)),
    onSuccess: (data) => {
      console.log(data);
      dispatch(updateComments(data.comments));
    },
  });
};

export const PostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: any) => {
      try {
        const { data } = await apiClient.post(baseURL, payload, {
          headers: { Authorization: `Bearer ${getCookie("Authorization")}` },
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
    async (payload: any) => {
      try {
        const { data: response } = await apiClient.put(
          `${baseURL}${postId}`,
          {
            content: payload.content,
          },
          {
            headers: { Authorization: `Bearer ${getCookie("Authorization")}` },
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
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async () => {
      try {
        const { data: response } = await apiClient.delete(
          `${baseURL}${postId}`,
          {
            headers: { Authorization: `Bearer ${getCookie("Authorization")}` },
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
      },
    }
  );
};

export const PostAiMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: any) => {
      try {
        const { data: response } = await apiClient.post(
          `${baseURL}ai`,
          payload,
          {
            headers: { Authorization: `Bearer ${getCookie("Authorization")}` },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onMutate: () => {
        dispatch(updateIsFetchingAiPost(true));
      },
      onSettled: () => {
        dispatch(updateIsFetchingAiPost(false));
      },
      onSuccess: (data: string) => {
        dispatch(updateAiPost(data));
      },
    }
    // {
    //   onError: () => {
    //     dispatch(updateSnackbarContent("Post creation unsuccessful."));
    //     dispatch(updateAlertSeverity("error"));
    //     dispatch(openSnackbar());
    //   },
    //   onSuccess: (data) => {
    //     queryClient.invalidateQueries("getAllPosts");
    //     queryClient.invalidateQueries(["getOnePost", data.ID]);
    //     // navigate(`/post/${data.post.ID}`);

    //     dispatch(updateSnackbarContent("Successfully created post."));
    //     dispatch(updateAlertSeverity("success"));
    //     dispatch(openSnackbar());
    //   },
    // }
  );
};
