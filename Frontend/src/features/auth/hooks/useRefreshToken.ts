import { useCallback } from "react";
import {
  RefreshTokenResponse,
  refreshTokenService,
} from "@/services/api/authApiServices";

export const useRefreshToken = () => {
  const refreshToken = useCallback(async () => {
    try {
      const response = (await refreshTokenService()) as RefreshTokenResponse;

      return response;
    } catch (error) {
      throw new Error(
        `Failed to refresh token from the service: ${(error as Error).message}`
      );
    }
  }, []);
  return { refreshToken };
};
