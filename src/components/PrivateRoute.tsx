import React from "react";
import { useNavigate, To } from "react-router-dom";
import { UserData } from "../modules/users/types";

interface Props {
  user: UserData | null;
  redirectPath?: To;
  children: React.ReactNode;
}

const PrivateRoute = ({
  user,
  redirectPath = "/",
  children,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  if (!user) {
    // not logged in so redirect to login page with the return url
    navigate(redirectPath);
  }

  // authorized so return child components
  return children as JSX.Element;
};

export default PrivateRoute;
