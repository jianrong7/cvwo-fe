import { useMutation, useQuery } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch } from "../app/hooks";
import { updateIsFetchingUser } from "../modules/users/userSlice";

const baseURL = "/users/";

export const LoginMutation = (handleLoginSuccess: any) => {
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
      onSuccess: handleLoginSuccess,
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
