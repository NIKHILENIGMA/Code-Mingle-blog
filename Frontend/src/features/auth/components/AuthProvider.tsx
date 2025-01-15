import Loader from "@/components/Loader/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRefreshToken } from "@/features/auth/hooks/useRefreshToken";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProps): JSX.Element {
  const location = useLocation();
  const { token, persist } = useAuth();
  const { refreshToken } = useRefreshToken();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log("Failed to refresh token: ", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (!token && persist) {
      refreshAccessToken();
    } else {
      setLoading(false);
    }
  }, [token, persist, refreshToken]);


  return (
    <div>
      {loading ? (
        <Loader />
      ) : token ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      )}
    </div>
  );
}

export default AuthProvider;
