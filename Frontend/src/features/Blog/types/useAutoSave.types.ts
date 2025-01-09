import { PostContent } from "../components/Drafts/DraftForm";

export interface useAutoSaveReturn {
    handleAutoSave: () => Promise<void>;
    isPending: boolean;
    isError: boolean;
  }
  
  export interface useAutoSaveProps {
    id: string;
    content: PostContent;
  }