import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  persist: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  persist: JSON.parse(localStorage.getItem("persist") || "false"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<{ accessToken: string; }>) => {
      state.accessToken = action.payload.accessToken;
    },

    setPersist: (state, action: PayloadAction<{ persist: boolean}>) => {
      state.persist = action.payload.persist;
      localStorage.setItem("persist", JSON.stringify(action.payload.persist));
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.persist = false;
      localStorage.removeItem("persist");
    },
  },
});

export const { setAccessToken, setPersist, clearAuth } = authSlice.actions;
export default authSlice.reducer;
