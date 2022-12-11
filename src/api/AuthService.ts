import { useMutation, useQuery } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch } from "../app/hooks";
import { updateIsFetchingUser } from "../modules/users/userSlice";
import { setCookie } from "typescript-cookie";
import type { AxiosResponse } from "axios";

import { updateCurrentUser } from "../modules/users/userSlice";
import {
  openSnackbar,
  updateAlertSeverity,
  updateSnackbarContent,
} from "../modules/snackbar/snackbarSlice";
import jwtDecode from "jwt-decode";

const baseURL = "/users/";

const handleLoginSuccess = (data: AxiosResponse<any, any>) => {
  const { data: res } = data;
  const decoded: { exp: number; iat: number; sub: number } = jwtDecode(
    res.token
  );
  // set cookie
  setCookie("Authorization", res.token, { expires: decoded.exp });
};

export const LoginMutation = (snackbarContent: string) => {
  const dispatch = useAppDispatch();
  return useMutation(
    (payload: LoginFormState) => {
      return apiClient.post(`${baseURL}login`, {
        username: payload.username,
        password: payload.password,
      });
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
        handleLoginSuccess(data);
        dispatch(updateCurrentUser(data.data));

        dispatch(updateSnackbarContent(snackbarContent));
        dispatch(updateAlertSeverity("success"));
        dispatch(openSnackbar());
      },
    }
  );
};

export const SignupMutation = () => {
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
      onSuccess: (_, variables) => {
        // login after signing up automatically
        loginMutate(variables);
      },
    }
  );
};

export const ValidateQuery = () => {
  return useQuery("validate-jwt", (payload) => {
    return apiClient.get(`${baseURL}validate`, { withCredentials: true });
  });
};
