import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCookie } from "typescript-cookie";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getQueryParams,
  updateIsFetchingPosts,
  updatePosts,
  updatePost,
  updateIsFetchingPost,
} from "../modules/posts/postsSlice";
import { PostQueryParams } from "../modules/posts/types";
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

  const fetchPost = async (id: string) => {
    dispatch(updateIsFetchingPost(true));
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  };

  return useQuery(["getOnePost", id], () => fetchPost(id), {
    onSettled: () => dispatch(updateIsFetchingPost(false)),
    onSuccess: (data) => {
      dispatch(updatePost(data.post));
    },
  });
};

export const CommentsFromPostQuery = (postId: string) => {
  const fetchComments = async () => {
    try {
      const response = await apiClient.get(`${baseURL}comments/${postId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getComments", postId], fetchComments);
};

// very iffy mutation that works intermittently
export const PostMutation = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: any) => {
      try {
        const { data: response } = await apiClient.post(baseURL, payload, {
          headers: { Authorization: `Bearer ${getCookie("Authorization")}` },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getAllPosts");
        queryClient.invalidateQueries("getOnePost");
        // navigate(`/post/${data.post.ID}`);
      },
    }
  );
};
