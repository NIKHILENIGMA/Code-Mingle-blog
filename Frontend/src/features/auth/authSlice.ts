import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  persist: boolean;
  user: object | null;
}

const initialState: AuthState = {
  accessToken: null,
  persist: JSON.parse(localStorage.getItem("persist") || "false"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },

    setPersist: (state, action: PayloadAction<{ persist: boolean }>) => {
      state.persist = action.payload.persist;
      localStorage.setItem("persist", JSON.stringify(action.payload.persist));
    },

    setUser(state, action: PayloadAction<{ user: object }>) {
      state.user = action.payload.user;
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.persist = false;
      state.user = null;
      localStorage.removeItem("persist");
    },
  },
});

export const { setAccessToken, setPersist, setUser, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
