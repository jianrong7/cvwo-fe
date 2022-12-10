import { useMutation, useQuery } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch } from "../app/hooks";
import { updateIsFetchingUser } from "../modules/users/userSlice";
import { setCookie } from "typescript-cookie";
import type { AxiosResponse } from "axios";

import { updateCurrentUser } from "../modules/users/userSlice";
import {
  toggleIsSnackbarOpen,
  updateAlertSeverity,
  updateSnackbarContent,
} from "../modules/snackbar/snackbarSlice";

const baseURL = "/users/";

const handleLoginSuccess = (data: AxiosResponse<any, any>) => {
  const { data: res } = data;
  // set cookie
  setCookie("Authorization", res.token, { expires: res.claims.exp });
};

export const LoginMutation = () => {
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
        dispatch(toggleIsSnackbarOpen());
      },
      onMutate: () => dispatch(updateIsFetchingUser(true)),
      onSettled: () => dispatch(updateIsFetchingUser(false)) as any,
      onSuccess: (data) => {
        handleLoginSuccess(data);
        dispatch(updateCurrentUser(data.data));

        dispatch(updateSnackbarContent("Logged in successfully!"));
        dispatch(updateAlertSeverity("success"));
        dispatch(toggleIsSnackbarOpen());
      },
    }
  );
};

export const SignupMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation(
    (payload: LoginFormState) => {
      return apiClient.post(`${baseURL}signup`, {
        username: payload.username,
        password: payload.password,
      });
    },
    {
      onSuccess: (data) => {
        dispatch(updateSnackbarContent("Signed up successfully!"));
        dispatch(updateAlertSeverity("success"));
        dispatch(toggleIsSnackbarOpen());
        const { mutate: login } = LoginMutation();
        login(data as any);
      },
    }
  );
};

export const ValidateQuery = () => {
  return useQuery("validate-jwt", (payload) => {
    return apiClient.get(`${baseURL}validate`, { withCredentials: true });
  });
};
