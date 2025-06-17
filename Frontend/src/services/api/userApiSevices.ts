import { AxiosError, AxiosResponse } from "axios";
import { apiInstance } from "./apiInstance";
import { PROFILE_URL } from "@/constants";

export const createUser = async (data: unknown): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.post("/users/new", data);
    if (!response.data) {
      throw new Error(`User creation failed: ${response.data}`);
    }

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


export const userDashboard = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.get(`${PROFILE_URL}/me/dashboard`);

    if (!response.data) {
      throw new Error(`Dashboard fetch failed: ${response.data}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Dashboard fetch failed ${(error as AxiosError).message}`);
  }
}

export const uploadAvatar = async (formData: FormData): Promise<AxiosResponse> => {
  try {

    const response = await apiInstance.post(
      `${PROFILE_URL}/me/avatar/upload`,
      formData
    );

    if (!response.data) {
      throw new Error(`Avatar upload failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Avatar upload failed ${(error as AxiosError).message}`);
  }
}

export const changeAvatar = async (formData: FormData): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.patch(
      `${PROFILE_URL}/me/avatar/change`,
      formData
    );

    if (!response.data) {
      throw new Error(`Avatar change failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Avatar change failed ${(error as AxiosError).message}`);
  }
}

export const deleteAvatar = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.delete(`${PROFILE_URL}/me/avatar/remove`);

    if (!response.data) {
      throw new Error(`Avatar deletion failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Avatar deletion failed ${(error as AxiosError).message}`);
  }
}