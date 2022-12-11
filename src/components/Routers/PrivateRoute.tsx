import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";

interface Props {
  component: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ component }) => {
  const token = getCookie("Authorization");
  if (token) {
    return <>{component}</>;
  }
  return <Navigate to="/" />;
};

export default PrivateRoute;
