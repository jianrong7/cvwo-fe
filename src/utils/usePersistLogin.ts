import { useEffect } from "react";

import { useAppDispatch } from "../app/hooks";
import {
  updateCurrentUser,
  updateIsFetchingUser,
} from "../modules/users/userSlice";
import { getCookie } from "typescript-cookie";
import jwtDecode from "jwt-decode";
import { RefreshTokenQuery } from "../api/AuthService";

export default function usePersistLogin() {
  const dispatch = useAppDispatch();
  const { data: res } = RefreshTokenQuery();
  useEffect(() => {
    dispatch(updateIsFetchingUser(true));
    const token = getCookie("Authorization");
    if (token) {
      const decoded: { exp: number; iat: number; sub: number } =
        jwtDecode(token);
      const curDate = new Date();
      const { exp } = decoded;
      if (exp * 1000 >= curDate.getTime()) {
        dispatch(updateCurrentUser(res?.data));
      }
    }

    dispatch(updateIsFetchingUser(false));
  }, [res]);
}
