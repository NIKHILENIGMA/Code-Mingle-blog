import { RootState } from "@/app/store/store";
import DraftActions from "@/features/Blog/components/Drafts/DraftActions";
import DraftForm from "@/features/Blog/components/Drafts/DraftForm";
import { useDraft } from "@/features/Blog/hooks/useDraft";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CreatePostPage: FC = () => {
  const sideBarState = useSelector((state: RootState) => state.blog.sideBar);
  const { draftId } = useParams<{ draftId: string }>();
  const { Draft } = useDraft(draftId as string);


  return (
    <div>
      <DraftActions />
      <div
        className={`${
          sideBarState
            ? "md:ml-[12vw] md:w-[80vw] overflow-x-hidden transform translate-x-20"
            : "w-full transform -translate-x-0"
        } h-full transition-transform duration-500 ease-in-out`}
      >
        {Draft && <DraftForm draft={Draft} />}
      </div>
    </div>
  );
};

export default CreatePostPage;
//
