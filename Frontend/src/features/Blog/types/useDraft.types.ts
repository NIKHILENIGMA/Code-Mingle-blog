import { Draft } from "@/features/drafts/types";

export interface useDraftReturn {
  Draft: Draft | undefined;
  isLoading: boolean;
  isError: boolean;
}
