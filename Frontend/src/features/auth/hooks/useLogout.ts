import { logoutService } from "@/services/api/authApiServices";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogout } from "../authSlice";
import { clearLocalStorage } from "@/Utils/tokenManagement";
import { useCallback } from "react";
import { isPending } from "@reduxjs/toolkit";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.path ?? "/";

  const logoutUserMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logoutService(),
    onSuccess: () => {
      // Clear the access token from the store
      dispatch(setLogout());
      // Clear the local storage access token and persistance value
      clearLocalStorage();
      // Navigate to the login page
      navigate(from);
    },
    onError: (error) => {
      console.error("Logout Mutation Failed, Potential Reason could be: %s", error);
    },
  });

  const logout = useCallback(async () => {
    try {
      // Call the logoutService function
      await logoutUserMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed: %s", error);
    }
  }, [logoutUserMutation]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout: %s", error);
    }
  };

  return { handleLogout, isLoggingOut: isPending };
};
