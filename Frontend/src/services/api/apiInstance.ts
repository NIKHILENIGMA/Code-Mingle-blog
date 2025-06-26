import axios from "axios";


const API_URL = "/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to add the token to the request headers
// apiInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("__acc");
//     if (token && config) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     } else if (config.headers) {
//       delete config.headers.Authorization;
//     }

//     return config;
//   },

//   (error: AxiosError): Promise<never> => {
//     return Promise.reject(error);
//   }
// );

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────
// This interceptor handles 401 errors by attempting to refresh the token.
// apiInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error && error?.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newAccessToken = await refreshTokenService();

//         if (!newAccessToken) {
//           return;
//         } else {
//           // Remove the previous token from local sto
//           removeAccessToken("__acc");

//           // Update the local storage
//           setAccessToken(newAccessToken?.data.token);

//           store.dispatch(
//             setCredentials({
//               isAuthenticated: true,
//               persist: true,
//               accessToken: newAccessToken.data.token,
//             })
//           );

//           originalRequest.headers.Authorization = `Bearer ${newAccessToken.data?.token}`;

//           return apiInstance(originalRequest);
//         }
//       } catch (error) {
//         console.error(`Token refresh Failed: ${error}`);

//         store.dispatch(setLogout());
//       }
//     }

//     return Promise.reject(error);
//   }
// );
