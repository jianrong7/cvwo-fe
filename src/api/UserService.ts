import { QueryFunctionContext, useQuery } from "react-query";
import { useAppSelector } from "../app/hooks";
import { getCurPost } from "../modules/posts/postsSlice";
import { Post } from "../modules/posts/types";

import apiClient from "./http-common";

const baseURL = "/users/";

export const UserQuery = (userId: string) => {
  // const curPost = useAppSelector(getCurPost);
  // const fetchUser = async (context: QueryFunctionContext) => {
  //   console.log(context);
  //   const { userId } = context.queryKey[1] as Post;
  //   const response = await apiClient.get(`${baseURL}${userId}`);
  //   return response.data;
  // };
  const fetchUser = async (userId: string) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  };
  return useQuery(["getUserById", userId], () => fetchUser(userId), {
    enabled: !!userId,
  });
};
