import { apiInstance } from "./apiInstance";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiInstance.post("/api/login", {
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

export const register = async (data: RegisterData) => {
  try {
    const response = await apiInstance.post("/api/register", data);

    if (response.status !== 200) {
      throw new Error("Failed to register");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (): Promise<unknown> => {
  try {
    const response = await apiInstance.post("/api/logout");

    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const refreshToken = async (): Promise<unknown> => {
  try {
    const response = await apiInstance.post("/api/refresh-token");

    if (response.status !== 200) {
      throw new Error("Failed to refresh token");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
