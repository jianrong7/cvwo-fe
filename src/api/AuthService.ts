import { useMutation, useQuery } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getRememberMe,
  updateIsFetchingUser,
} from "../modules/users/userSlice";
import { setCookie } from "typescript-cookie";

import { updateCurrentUser } from "../modules/users/userSlice";
import {
  openSnackbar,
  updateAlertSeverity,
  updateSnackbarContent,
} from "../modules/snackbar/snackbarSlice";
import jwtDecode from "jwt-decode";
import { UserLoginOutput } from "../modules/users/types";

const baseURL = "/users/";

const setTokenInCookies = (
  data: UserLoginOutput,
  rememberMe: boolean | null
) => {
  const decoded: { exp: number; iat: number; sub: number } = jwtDecode(
    data?.token as string
  );
  setCookie("Authorization", data.token, {
    path: "",
    expires: rememberMe ? decoded.exp : 0,
  });
};

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
      onSettled: () => dispatch(updateIsFetchingUser(false)) as any,
      onSuccess: (data) => {
        setTokenInCookies(data, rememberMe);
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

export const RefreshTokenQuery = () => {
  return useQuery(
    "refresh-token",
    () => apiClient.get(`${baseURL}refresh`, { withCredentials: true }),
    {
      // refetchInterval: 1000 * 60 * 5,
      // refetchIntervalInBackground: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};
