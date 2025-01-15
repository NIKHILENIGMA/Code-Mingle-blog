import { FC } from "react";
import DraftActions from "@/features/Blog/components/Drafts/DraftActions";
import DraftForm from "@/features/Blog/components/Drafts/DraftForm";

const CreatePostPage: FC = () => {
  return (
    <div className="w-full h-full py-2 space-y-10">
      <DraftActions />
      <DraftForm />
    </div>
  );
};

export default CreatePostPage;
//
