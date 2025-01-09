import { Draft } from "@/Types/draft";

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