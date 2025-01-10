import { AUTHENTICATION_URL } from "@/constants/constants";
import { apiInstance } from "./apiInstance";
import { RegisterUser } from "@/Types/auth";
import axios, { AxiosResponse } from "axios";

export interface RefreshTokenResponse {
  data: {
    token: string;
  }
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordResponse {
  token: string;
}

export const currentUserService = async () => {
  try {
    const response = await apiInstance.get(`${AUTHENTICATION_URL}/get-user`);

    if (response.status !== 200) {
      throw new Error("Failed to get current user");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}



export const signup = async (user: RegisterUser) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/signup`,
      user
    );

    if (response.status !== 200) {
      throw new Error("Failed to register user account");
    }
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const loginService = async (email: string, password: string) => {
  try {
    const response = await apiInstance.post(`${AUTHENTICATION_URL}/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Failed to login");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    await apiInstance.delete(`${AUTHENTICATION_URL}/logout`);

  } catch (error) {
    console.error(error);
  }
};

export const refreshTokenService = async (): Promise<RefreshTokenResponse | void> => {
  try {
    const response: AxiosResponse<RefreshTokenResponse> = await apiInstance.post(
      `${AUTHENTICATION_URL}/refresh-token`
    );

    if (response.status !== 200) {
      throw new Error("Failed to refresh token");
    }

    return response.data;
  } catch (error) {
     if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
     }
  }
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse | void> => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/forgot-password`,
      { email }
    );

    if (response.status !== 200) {
      throw new Error("Failed to send password reset email");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const resetPassword = async (password: string, confirmPassword: string) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/reset-password`,
      { password, confirmPassword }
    );

    if (response.status !== 200) {
      throw new Error("Failed to reset password");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
