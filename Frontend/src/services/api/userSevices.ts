import { AxiosError, AxiosResponse } from "axios";
import { apiInstance } from "./apiInstance";

export const createUser = async (data: unknown): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.post("/users/new", data);
    if (!response.data) {
      throw new Error(`User creation failed: ${response.data}`);
    }

    console.log("User created successfully: ", response.data);

    return response.data;
  } catch (error) {
    throw new Error(`User creation failed ${(error as AxiosError).message}`);
  }
};

export const updateUser = async (
  id: string,
  data: unknown
): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.patch(`/users/${id}`, data);

    if (!response.data) {
      throw new Error(`User update failed: ${response.data}`);
    }

    console.log("User updated successfully: ", response.data);

    return response.data;
  } catch (error) {
    throw new Error(`User update failed ${(error as AxiosError).message}`);
  }
};

export const getUser = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.get(`/users/${id}`);

    if (!response.data) {
      throw new Error(`User fetch failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`User fetch failed ${(error as AxiosError).message}`);
  }
};

export const allUsers = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.get("/users");

    if (!response.data) {
      throw new Error(`User fetch failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`User fetch failed ${(error as AxiosError).message}`);
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/users/${id}`);
  } catch (error) {
    throw new Error(`User deletion failed ${(error as AxiosError).message}`);
  }
};
