import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  checkTokenValidity,
  getAccessToken,
  getPersist,
  removeAccessToken,
  setAccessToken,
} from "@/Utils/tokenManagement";
import { setCredentials, setUser, setLogout } from "@/features/auth/authSlice";
import { useRefreshToken } from "@/features/auth/hooks/useRefreshToken";
import { useUser } from "@/features/Profile/hooks/useUser";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const {
    accessToken: reduxAccessToken,
    loading,
    persist,
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const storedToken: string | null = getAccessToken("__acc");
  const { refreshToken } = useRefreshToken(); 
  const { currentUser } = useUser();

  // Local flag to prevent multiple API calls
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const tokenState = async () => {
      // If we already have a valid token in Redux, skip the refresh flow
      if (reduxAccessToken) {
        setInitialized(true);
        return;
      }

      // If token from local storage is valid, update the Redux state
      if (storedToken && checkTokenValidity(storedToken)) {
        dispatch(
          setCredentials({
            accessToken: storedToken,
            persist: true,
            isAuthenticated: true,
          })
        );
      } else {
        // Remove the expired token
        removeAccessToken("__acc");
        try {
          // Check if we have a refresh token to get a new access token

          const isPersist = getPersist("__persist");
          if (isPersist) {
            // Call refresh token API to get a new access token
            const response = await refreshToken();
            const newAccessToken = response?.data.token;
            if (newAccessToken) {
              // Update local storage and Redux state with the new token
              setAccessToken(newAccessToken);
              dispatch(
                setCredentials({
                  accessToken: newAccessToken,
                  persist: true,
                  isAuthenticated: true,
                })
              );
              // Fetch current user details and update Redux store
              const user = currentUser;

              dispatch(
                setUser({
                  user: user,
                })
              );
            }
          } else {
            // Optionally handle the case when no token is returned
            dispatch(setLogout());
          }
        } catch (error) {
          // Handle errors appropriately (e.g., dispatch logout or show an error message)
          console.error("Error refreshing token:", error);
          dispatch(setLogout());
        }
      }
      // Mark as initialized to avoid re-running the effect
      setInitialized(true);
    };

    tokenState();
  // amazonq-ignore-next-line
  }, [reduxAccessToken, storedToken, dispatch, refreshToken, currentUser]);

  return {
    accessToken: reduxAccessToken,
    loading,
    persist,
    initialized,
  };
};
