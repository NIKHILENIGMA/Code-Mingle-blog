import { store } from "@/app/store/store";
import { clearAuth } from "@/features/auth/authSlice";
// import { useRefreshToken } from "@/features/auth/hooks/useRefreshToken";
import axios from "axios";
import { refreshTokenService } from "./authServices";

const API_URL = "/api";

export const apiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to add the token to the request headers
apiInstance.interceptors.request.use((config) => {
  const token = store.getState().auth?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

// Add a response interceptor to handle token expiration
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error) => {
    if (error.response.status === 401 || error.response.data.status === 404) {
      const newAccessToken = await refreshTokenService();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } else {
        store.dispatch(clearAuth());
      }
    }
    return Promise.reject(error);
  }
);
