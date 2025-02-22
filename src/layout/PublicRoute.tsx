import { useAuthSelector } from "@/hooks/useApp";
import { Navigate } from "react-router-dom";
import { IChildrenProps } from "@/types";

const PublicRoute = ({ children }: IChildrenProps) => {
  const { token } = useAuthSelector();

  if (token) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
