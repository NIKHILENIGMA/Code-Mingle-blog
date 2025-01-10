import { RefreshTokenResponse, refreshTokenService } from "@/services/api/authApiServices";
import { setAccessToken, setPersist } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const response  = await refreshTokenService() as RefreshTokenResponse;
      
      console.log("useRefeshtoken response value: ",response.data.token);

      dispatch(setAccessToken({ accessToken: response.data.token }));
      dispatch(setPersist({ persist: true }));

      console.log("Refresh token store in redux state successfully: ", response.data.token);
      
    } catch (error) {
      throw new Error(
        `Failed to refresh token from the service: ${(error as Error).message}`
      );
    }
  };
  return { refreshToken };
};


