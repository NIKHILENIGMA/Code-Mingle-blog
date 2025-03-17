import { FC } from "react";
import DraftActions from "@/features/drafts/components/Drafts/DraftActions";
import DraftForm from "@/features/drafts/components/Drafts/DraftForm";

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
