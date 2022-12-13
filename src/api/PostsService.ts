import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getQueryParams,
  updateIsFetchingPosts,
  updatePosts,
  updatePost,
  updateIsFetchingPost,
} from "../modules/posts/postsSlice";
import { PostQueryParams } from "../modules/posts/types";
import { PostInput } from "../pages/CreatePost";
import apiClient from "./http-common";

const baseURL = "/posts/";

export const PostsQuery = () => {
  const dispatch = useAppDispatch();
  const queryParams: PostQueryParams = useAppSelector(getQueryParams);
  const fetchPosts = async (context: any) => {
    const { tags, order, sort } = context.queryKey[1];
    dispatch(updateIsFetchingPosts(true));
    const response = await apiClient.get(
      `${baseURL}?tags=${tags}&sort=${sort}&order=${order}`
    );
    return response.data;
  };

  return useQuery(["getAllPosts", queryParams], fetchPosts, {
    onSettled: () => dispatch(updateIsFetchingPosts(false)),
    onSuccess: (data) => dispatch(updatePosts(data.posts)),
  });
};

export const PostQuery = (id: string) => {
  const dispatch = useAppDispatch();
  // const fetchPost = async () => {
  //   dispatch(updateIsFetchingPost(true));
  //   const response = await apiClient.get(`${baseURL}${id}`);
  //   return response.data;
  // };

  const fetchPost = async (id: string) => {
    dispatch(updateIsFetchingPost(true));
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  };

  return useQuery("getOnePost", () => fetchPost(id), {
    onSettled: () => dispatch(updateIsFetchingPost(false)),
    onSuccess: (data) => {
      dispatch(updatePost(data.post));
    },
  });
};

export const PostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: any) => {
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
        console.log(data);
        queryClient.invalidateQueries("getAllPosts");
        queryClient.invalidateQueries("getOnePost");
        navigate(`/post/${data.post.ID}`);
      },
    }
  );
};
