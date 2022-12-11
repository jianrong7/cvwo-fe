import type { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  updateIsFetchingPosts,
  updatePosts,
} from "../modules/posts/postsSlice";
import { PostInput } from "../pages/CreatePost";

import apiClient from "./http-common";

const baseURL = "/posts/";

export const PostsQuery = () => {
  const dispatch = useAppDispatch();
  const fetchPosts = () => {
    dispatch(updateIsFetchingPosts(true));
    return apiClient.get(baseURL).then((res) => res.data);
  };

  return useQuery("getAllPosts", fetchPosts, {
    onSettled: () => dispatch(updateIsFetchingPosts(false)),
    onSuccess: (data) => dispatch(updatePosts(data.posts)),
  });
};

export const PostQuery = (id: string) => {
  const dispatch = useAppDispatch();
  const fetchPost = () => {
    dispatch(updateIsFetchingPosts(true));
    return apiClient.get(`${baseURL}${id}`);
  };

  return useQuery("getOnePost", fetchPost, {
    onSettled: () => dispatch(updateIsFetchingPosts(false)),
    // onSuccess: (data: any) => dispatch(updatePosts(data?.data)),
  });
};

export const PostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: PostInput) => {
      try {
        const { data: response } = await apiClient.post(baseURL, {
          title: payload.title,
          content: payload.content,
          tags: payload.tags,
        });
        return response;
      } catch (err) {
        console.error(err);
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getAllPosts");
        queryClient.invalidateQueries("getOnePost");
        navigate(`/post/${data.post.ID}`);
      },
    }
  );
};
