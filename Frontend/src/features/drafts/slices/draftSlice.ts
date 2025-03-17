import { Draft } from "@/features/drafts/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  saveDraft: 'idle' | 'saving' | 'saved' | 'error';
  selectedDraft: Draft | null;
}

const initialState: InitialStateProps = {
  saveDraft: 'idle',
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

    setSaveDraft: (state, action: PayloadAction<{ saveDraft: 'idle' | 'saving' | 'saved' | 'error' }>) => {
      state.saveDraft = action.payload.saveDraft;
    },
  },
});

export const { setSelectedDraft, setSaveDraft, updateSelectedDraft } = draftSlice.actions;
export default draftSlice.reducer;
