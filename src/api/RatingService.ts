import { useMutation, useQueryClient } from "react-query";
import { getCookie } from "typescript-cookie";
import apiClient from "./http-common";

const baseURL = "/ratings/";

export const RatingMutation = () => {
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
    }
    // {
    //   onSuccess: () => queryClient.invalidateQueries(["getComments", postId]),
    // }
  );
};
