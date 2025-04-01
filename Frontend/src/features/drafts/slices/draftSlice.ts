import { Draft } from "@/features/drafts/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  selectedDraft: Draft | null;
}

const initialState: InitialStateProps = {
  selectedDraft: null,
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setSelectedDraft: (
      state,
      action: PayloadAction<{ selectedDraft: Draft }>
    ) => {
      state.selectedDraft = action.payload.selectedDraft;
    },

    updateSelectedDraft: (state, action: PayloadAction<Partial<Draft>>) => {
      if (state.selectedDraft) {
        state.selectedDraft = {
          ...state.selectedDraft,
          ...action.payload,
        };
      }
    },
  },
});

export const { setSelectedDraft, updateSelectedDraft } = draftSlice.actions;
export default draftSlice.reducer;
