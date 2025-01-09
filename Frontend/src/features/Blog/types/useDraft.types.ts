import { Draft } from "@/Types/draft";

export interface useDraftReturn {
  Draft: Draft | undefined;
  isLoading: boolean;
  isError: boolean;
}
