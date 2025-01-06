import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  coverImageUrl: "",
  post: {
    title: "",
    content: "",
  },
  sideBar: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCoverImage: (
      state,
      action: PayloadAction<{ coverImageUrl: string }>
    ) => {
      state.coverImageUrl = action.payload.coverImageUrl;
    },

    resetCoverImage: (state) => {
      state.coverImageUrl = "";
    },

    setPostContent: (
      state,
      action: PayloadAction<{ post: { title: string; content: string } }>
    ) => {
      state.post = action.payload.post;
    },

    setSideBar: (state, action: PayloadAction<{ sideBar: boolean }>) => {
      state.sideBar = action.payload.sideBar;
    },
  },
});

export const { setCoverImage, resetCoverImage, setPostContent, setSideBar } =
  blogSlice.actions;
export default blogSlice.reducer;
