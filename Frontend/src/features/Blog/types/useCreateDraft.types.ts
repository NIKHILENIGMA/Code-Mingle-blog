export interface useCreateDraftReturn {
  handleNewDraft: () => Promise<void>;
  isPending: boolean;
  isError: boolean;
}