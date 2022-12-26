import { useMutation, useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PayloadState } from "../components/user/MainContent";
import { UserModel } from "../modules/users/types";
import {
  getCurrentUser,
  getUserData,
  updateCurrentUser,
  updateIsFetchingUser,
  updateUserData,
} from "../modules/users/userSlice";

import apiClient from "./http-common";

const baseURL = "/users/";

export const UserQuery = (userId: string) => {
  const dispatch = useAppDispatch();
  const fetchUser = async () => {
    dispatch(updateIsFetchingUser(true));
    try {
      const { data } = await apiClient.get(`${baseURL}${userId}`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getUserById", userId], fetchUser, {
    enabled: !!userId,
    onSettled: () => dispatch(updateIsFetchingUser(false)),
    onSuccess: (data) => dispatch(updateUserData(data.user)),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const UserRatedQuery = (payload: PayloadState) => {
  const fetchUserRated = async () => {
    try {
      const response = await apiClient.post(`${baseURL}selected`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  return useQuery(["getUserRated", payload], fetchUserRated, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const UserUploadPicture = (userId: string) => {
  const { mutate } = UpdateUser(userId);
  return useMutation(
    async (payload: any) => {
      try {
        const { data } = await apiClient.post(`${baseURL}${userId}`, payload, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
    {
      onSuccess: (data) => {
        mutate({
          imageName: data?.imageName,
          userId: parseInt(userId),
        });
      },
    }
  );
};

export const UpdateUser = (userId: string) => {
  const dispatch = useAppDispatch();
  const curUser = useAppSelector(getCurrentUser);
  const userData = useAppSelector(getUserData);
  return useMutation(
    async (payload: any) => {
      try {
        const { data } = await apiClient.put(`${baseURL}${userId}`, payload, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
    {
      onMutate: () => dispatch(updateIsFetchingUser(true)),
      onSettled: () => dispatch(updateIsFetchingUser(false)) as any,
      onSuccess: (data: { user: UserModel }) => {
        const { profilePicture } = data.user;
        dispatch(
          updateCurrentUser({
            ...curUser,
            profilePicture: profilePicture,
          })
        );
        dispatch(
          updateUserData({
            ...userData,
            profilePicture: profilePicture,
          } as UserModel)
        );
      },
    }
  );
};
