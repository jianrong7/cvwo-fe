import { QueryFunctionContext, useQuery } from "react-query";
import { useAppSelector } from "../app/hooks";
import { PayloadState } from "../components/user/MainContent";
import { getCurPost } from "../modules/posts/postsSlice";
import { Post } from "../modules/posts/types";

import apiClient from "./http-common";

const baseURL = "/users/";

export const UserQuery = (userId: string) => {
  const fetchUser = async (userId: string) => {
    try {
      const response = await apiClient.get(`${baseURL}${userId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getUserById", userId], () => fetchUser(userId), {
    enabled: !!userId,
  });
};

export const UserRatedQuery = (payload: PayloadState) => {
  const fetchUserRated = async () => {
    try {
      const response = await apiClient.post(`${baseURL}selected`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getUserRated", payload], fetchUserRated, {
    // onSuccess: (data) => console.log("onsuccess", data),
  });
};
