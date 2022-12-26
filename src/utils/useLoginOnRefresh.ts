import { isAfter } from "date-fns";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { RefreshTokenMutation } from "../api/AuthService";

const useLoginOnRefresh = () => {
  const { mutate } = RefreshTokenMutation();
  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      const { exp } = jwtDecode(accessToken) as {
        exp: number;
        sub: number;
        iat: number;
      };
      const expDate = new Date(exp * 1000);
      const now = new Date();

      if (isAfter(now, expDate)) {
        window.localStorage.removeItem("accessToken");
      } else {
        mutate({
          accessToken,
        });
      }
    }
  }, []);
};

export default useLoginOnRefresh;
