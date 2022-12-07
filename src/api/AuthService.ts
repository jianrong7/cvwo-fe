import { useMutation, useQuery } from "react-query";

import apiClient from "./http-common";
import type { LoginFormState } from "../components/Authentication/AuthModal";
import { useAppDispatch } from "../app/hooks";
import { updateIsFetchingUser } from "../modules/users/userSlice";

export const LoginMutation = (handleLoginSuccess: any) => {
  const dispatch = useAppDispatch();
  return useMutation(
    (payload: LoginFormState) => {
      return apiClient.post("/users/login", {
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

export const Signup = () => {
  return useMutation((payload: LoginFormState) => {
    return apiClient.post("/users/signup", {
      username: payload.username,
      password: payload.password,
    });
  });
};
