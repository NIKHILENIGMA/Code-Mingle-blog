import { useCallback, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRefreshToken } from "../hooks/useRefreshToken";

const useRemainAuthenticated = () => {
    const { token, persist, loading } = useAuth();
    const { refreshToken } = useRefreshToken();
  
    const getRefreshToken = useCallback(async () => {
      await refreshToken();
    }, [refreshToken]);
    
    useEffect(() => {
        if (!token && persist) {
          getRefreshToken();
        }
      }, [token, persist, getRefreshToken]);
    
    return { getRefreshToken, loading };
};

export default useRemainAuthenticated;
