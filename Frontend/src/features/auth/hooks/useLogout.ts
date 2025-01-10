import { logoutService } from "@/services/api/authApiServices";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuth } from "../authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.path || "/";

  const { mutateAsync: logoutUserMutation } = useMutation({
    mutationFn: async () => {
      try {
        await logoutService();
      } catch (error) {
        throw new Error(`Logout service failed: ${(error as Error).message}`);
      }
    },
  });

  const logout = async () => {
    try {
      // Call the logoutService function
      await logoutUserMutation();

      // Clear the access token from the store
      dispatch(clearAuth());

      // Navigate to the login page
      navigate(from);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return { logout };
};
