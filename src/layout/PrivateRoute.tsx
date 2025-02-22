import { useAuthSelector } from "@/hooks/useApp";
import useLogout from "@/hooks/userLogout";

import { IPrivateRoute, IUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }: IPrivateRoute) => {
  const { token } = useAuthSelector();
  const logout = useLogout();

  if (!token) {
    logout();
    return <Navigate to="/login" replace />;
  }

  const user: IUser | undefined = verifyToken(token);

  if (!user || (role && role !== user.role)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
