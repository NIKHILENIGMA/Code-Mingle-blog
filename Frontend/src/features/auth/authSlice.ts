import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser } from "./types/authTypes";


const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("__acc") || null,
  persist: JSON.parse(localStorage.getItem("__persist") || "false"),
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientials(
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        accessToken: string;
        persist: boolean;
      }>
    ) {
      const { isAuthenticated, accessToken, persist } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.accessToken = accessToken;
      state.persist = persist;
    },

    setUser(state, action: PayloadAction<{ user: AuthUser }>) {
      state.user = action.payload.user;
    },

    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.loading = action.payload.loading;
    },

    setLogout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.persist = false;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, setLoading, setUser, setLogout } =
  authSlice.actions;

export default authSlice.reducer;
