import type { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useAppDispatch } from "../app/hooks";
import {
  updateIsFetchingPosts,
  updatePosts,
} from "../modules/posts/postsSlice";
import { Post } from "../modules/posts/types";

import apiClient from "./http-common";

const baseURL = "/posts/";

export const PostsQuery = () => {
  const dispatch = useAppDispatch();
  const fetchPosts = () => {
    dispatch(updateIsFetchingPosts(true));
    return apiClient.get(baseURL);
  };

  return useQuery("getAllPosts", fetchPosts, {
    onSettled: () => dispatch(updateIsFetchingPosts(false)),
    onSuccess: (data: any) => dispatch(updatePosts(data?.data)),
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
