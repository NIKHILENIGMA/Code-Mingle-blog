import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import blogReducer from "../../features/Blog/slices/blogSlice";
import draftReducer from "../../features/drafts/slices/draftSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    draft: draftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
