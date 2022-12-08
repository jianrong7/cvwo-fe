import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getCurrentUser,
  updateCurrentUser,
  updateIsFetchingUser,
} from "../modules/users/userSlice";
import apiClient from "../api/http-common";

export function useFindUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser);

  useEffect(() => {
    if (!user) {
      reAuthenticateUser();
    } else {
      dispatch(updateIsFetchingUser(false));
    }
  }, [user]);

  async function reAuthenticateUser() {
    dispatch(updateIsFetchingUser(true));
    const res = await apiClient.get(`/users/validate`, {
      withCredentials: true,
    });
    if (res) {
      dispatch(updateCurrentUser(res?.data));
    }
    dispatch(updateIsFetchingUser(false));
  }
  return;
}
