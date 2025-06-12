import { FC, ReactNode } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, accessToken } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
