export interface useCreateDraftReturn {
  handleNewDraft: () => Promise<string | void>;
  isPending: boolean;
  isError: boolean;
}