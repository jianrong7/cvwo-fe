import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { useAppSelector } from "../../app/hooks";
import { getCurrentUser } from "../../modules/users/userSlice";

interface Props {
  component: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ component }) => {
  const curUser = useAppSelector(getCurrentUser);
  const token = getCookie("Authorization");
  if (!token || !curUser) {
    return <Navigate to="/" />;
  }
  return <>{component}</>;
};

export default PrivateRoute;
