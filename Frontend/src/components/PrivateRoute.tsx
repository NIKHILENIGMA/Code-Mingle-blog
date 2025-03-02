import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  authStatus?: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  authStatus = true,
}) => {
  const {
    accessToken: reduxAccessToken,
    loading,
    persist,
    initialized,
  } = useAuth();

  if (loading || !initialized) {
    return <Loader />;
  }

  return reduxAccessToken && persist && authStatus ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  authStatus: PropTypes.bool,
};

export default PrivateRoute;
