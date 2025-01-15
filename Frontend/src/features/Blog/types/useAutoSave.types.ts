
interface PostContent {
    title: string;
    body: string;
  }

export interface useAutoSaveReturn {
    handleAutoSave: () => Promise<void>;
    isPending: boolean;
    isError: boolean;
  }
  
  export interface useAutoSaveProps {
    id: string;
    content: PostContent;
  }