import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import blogReducer from "../../features/Blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
