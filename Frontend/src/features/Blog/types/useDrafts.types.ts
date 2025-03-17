import { Draft } from "@/features/drafts/types";

export interface useDraftsProps {
  isOpen: boolean;
}

export interface useDraftsReturn {
  Drafts: {
    data: Draft[]
  } | undefined;
  isLoading: boolean;
  isError: boolean;
}