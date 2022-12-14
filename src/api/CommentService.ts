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
      onSuccess: (_) => queryClient.invalidateQueries(["getComments", postId]),
    }
  );
};
