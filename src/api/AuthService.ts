import { useMutation, useQuery } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch } from "../app/hooks";
import { updateIsFetchingUser } from "../modules/users/userSlice";
import { setCookie } from "typescript-cookie";
import type { AxiosResponse } from "axios";

import { updateCurrentUser } from "../modules/users/userSlice";

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
      // onError:
      onMutate: () => dispatch(updateIsFetchingUser(true)),
      onSettled: () => dispatch(updateIsFetchingUser(false)) as any,
      onSuccess: (data) => {
        handleLoginSuccess(data);
        dispatch(updateCurrentUser(data.data));
      },
      retry: 2,
    }
  );
};

export const SignupMutation = () => {
  return useMutation((payload: LoginFormState) => {
    return apiClient.post(`${baseURL}signup`, {
      username: payload.username,
      password: payload.password,
    });
  });
};

export const ValidateQuery = () => {
  return useQuery("validate-jwt", (payload) => {
    return apiClient.get(`${baseURL}validate`, { withCredentials: true });
  });
};
