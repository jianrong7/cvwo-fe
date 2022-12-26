import { useMutation, useQueryClient } from "react-query";
import apiClient from "./http-common";

const baseURL = "/ratings/";

export const RatingMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: any) => {
      try {
        const { data: response } = await apiClient.put(baseURL, payload, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getOnePost", postId]);
        queryClient.invalidateQueries(["getComments", postId]);
      },
    }
  );
};
