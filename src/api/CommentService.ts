import { useMutation, useQueryClient } from "react-query";
import { getCookie } from "typescript-cookie";
import apiClient from "./http-common";

const baseURL = "/comments/";

export const CommentMutation = (postId: string) => {
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
      onSuccess: () => queryClient.invalidateQueries(["getComments", postId]),
    }
  );
};

export const CommentDeleteMutation = (commentId: number, postId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      try {
        const { data: response } = await apiClient.delete(
          `${baseURL}${commentId}`,
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
      onSuccess: () => {
        queryClient.invalidateQueries(["getOnePost", postId]);
        queryClient.invalidateQueries(["getComments", postId.toString()]);
      },
    }
  );
};
