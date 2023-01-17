import { useMutation } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getRememberMe,
  updateIsFetchingUser,
} from "../modules/users/userSlice";

import { updateCurrentUser } from "../modules/users/userSlice";
import {
  openSnackbar,
  updateAlertSeverity,
  updateSnackbarContent,
} from "../modules/snackbar/snackbarSlice";

const baseURL = "/users/";

export const LoginMutation = (snackbarContent: string) => {
  const rememberMe = useAppSelector(getRememberMe);
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: LoginFormState) => {
      try {
        const { data: response } = await apiClient.post(`${baseURL}login`, {
          username: payload.username,
          password: payload.password,
        });
        return response;
      } catch (err) {
        throw err;
      }
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Login unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onMutate: () => dispatch(updateIsFetchingUser(true)),
      onSettled: () => dispatch(updateIsFetchingUser(false)) as unknown as void,
      onSuccess: (data) => {
        if (rememberMe) window.localStorage.setItem("accessToken", data.token);
        dispatch(updateCurrentUser(data));

        dispatch(updateSnackbarContent(snackbarContent));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};

export const SignupMutation = () => {
  const dispatch = useAppDispatch();
  const { mutate: loginMutate } = LoginMutation(
    "Registered and logged in successfully!"
  );
  return useMutation(
    (payload: LoginFormState) => {
      return apiClient.post(`${baseURL}signup`, {
        username: payload.username,
        password: payload.password,
      });
    },
    {
      onError: () => {
        dispatch(updateSnackbarContent("Signup unsuccessful."));
        dispatch(updateAlertSeverity("error"));
        dispatch(openSnackbar());
      },
      onSuccess: (_, variables) => {
        // login after signing up automatically
        loginMutate(variables);
      },
    }
  );
};

export const RefreshTokenMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation(
    async (payload: { accessToken: string }) => {
      try {
        const { data } = await apiClient.post(
          `${baseURL}refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${payload.accessToken}` },
          }
        );
        return data;
      } catch (err) {
        throw err;
      }
    },
    {
      onSuccess: (data) => {
        window.localStorage.setItem("accessToken", data.token);
        dispatch(updateCurrentUser(data));
      },
    }
  );
};
