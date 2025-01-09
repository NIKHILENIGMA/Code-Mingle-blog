import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  saveDraft: false,
};

const blogSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setSaveDraft: (state, action: PayloadAction<{ saveDraft: boolean }>) => {
      state.saveDraft = action.payload.saveDraft;
    },
  },
});

export const { setSaveDraft } = blogSlice.actions;
export default blogSlice.reducer;
