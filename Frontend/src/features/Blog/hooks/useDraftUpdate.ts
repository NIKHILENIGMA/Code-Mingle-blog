import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateSelectedDraft } from "../slices/draftSlice";

export const useDraftUpdate = () => {
    const dispatch = useDispatch();

    const updateDraft = useCallback((field: string, value: string) => {
        dispatch(updateSelectedDraft({ [field]: value }));
    }, [dispatch])

    return { updateDraft };
}