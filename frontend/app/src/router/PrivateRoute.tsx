import { Route, RouteProps, Redirect } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { loginUser } = useLoginUser();
  const isAuthenticated = loginUser != null;
  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};
