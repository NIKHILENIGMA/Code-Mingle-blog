import { AUTHENTICATIONURL } from "@/constants/constants";
import { apiInstance } from "./apiInstance";
import { RegisterUser } from "@/Types/auth";

export const signup = async (user: RegisterUser) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATIONURL}/signup`,
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
    const response = await apiInstance.post(`${AUTHENTICATIONURL}/login`, {
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

export const logout = async (): Promise<unknown> => {
  try {
    const response = await apiInstance.post(`${AUTHENTICATIONURL}/logout`);

    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const refreshTokenService = async () => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATIONURL}/refresh-token`
    );

    if (response.status !== 200) {
      throw new Error("Failed to refresh token");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATIONURL}/forgot-password`,
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

export const resetPassword = async (email: string) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATIONURL}/reset-password`,
      { email }
    );

    if (response.status !== 200) {
      throw new Error("Failed to reset password");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
