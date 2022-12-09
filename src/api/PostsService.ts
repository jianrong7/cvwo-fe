import type { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const PostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: Post) => {
      return apiClient.post(baseURL, {
        body: payload.body,
        title: payload.title,
        userId: payload.userId,
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getAllPosts");
        queryClient.invalidateQueries("getOnePost");
      },
    }
  );
};

// export const LoginMutation = () => {
//   const dispatch = useAppDispatch();
//   return useMutation(
//     (payload: LoginFormState) => {
//       return apiClient.post(`${baseURL}login`, {
//         username: payload.username,
//         password: payload.password,
//       });
//     },
//     {
//       // onError:
//       onMutate: () => dispatch(updateIsFetchingUser(true)),
//       onSettled: () => dispatch(updateIsFetchingUser(false)) as any,
//       onSuccess: (data) => {
//         handleLoginSuccess(data);
//         dispatch(updateCurrentUser(data.data));
//       },
//       retry: 2,
//     }
//   );
// };
