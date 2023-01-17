import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCommentsQueryParams } from "../modules/post/postSlice";
import {
  openSnackbar,
  updateAlertSeverity,
  updateSnackbarContent,
} from "../modules/snackbar/snackbarSlice";
import apiClient from "./http-common";

const baseURL = "/comments/";

export const CommentMutation = (postId: string) => {
  const { sort } = useAppSelector(getCommentsQueryParams);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: { content: string; postId: number }) => {
      try {
        const { data: response } = await apiClient.post(baseURL, payload, {
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
      onError: () => {
        dispatch(updateSnackbarContent("Comment creation unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["getComments", postId, sort]);

        dispatch(updateSnackbarContent("Successfully created comment."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};

export const CommentEditMutation = (commentId: number, postId: number) => {
  const { sort } = useAppSelector(getCommentsQueryParams);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: { content: string }) => {
      try {
        const { data: response } = await apiClient.put(
          `${baseURL}${commentId}`,
          { content: payload.content },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Edit comment unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["getComments", postId.toString(), sort]);

        dispatch(updateSnackbarContent("Successfully edited comment."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};

export const CommentDeleteMutation = (commentId: number, postId: number) => {
  const { sort } = useAppSelector(getCommentsQueryParams);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(
    async () => {
      try {
        const { data: response } = await apiClient.delete(
          `${baseURL}${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Comment deletion unsuccessful."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["getOnePost", postId]);
        queryClient.invalidateQueries(["getComments", postId.toString(), sort]);
        dispatch(updateSnackbarContent("Successfully deleted comment."));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};
