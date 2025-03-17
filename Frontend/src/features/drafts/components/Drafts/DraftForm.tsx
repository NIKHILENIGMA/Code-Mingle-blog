import { FC } from "react";
import TiptapEditor from "@/features/editor/components/TiptapEditor/TipTapEditor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateSelectedDraft } from "@/features/drafts/slices/draftSlice";

const DraftForm: FC = () => {
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );
  const dispatch = useDispatch();

  const handleEditorChange = (updatedContent: string) => {
    dispatch(
      updateSelectedDraft({ ...selectedDraft, content: updatedContent })
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* <hr className="my-2" /> */}
      <div className="flex flex-col h-full w-[57vw] p-2 mx-auto space-y-3 rounded-lg mb-16">
        <TiptapEditor
          key={selectedDraft?.id}
          initialContent={selectedDraft?.content || ""}
          onContentChange={handleEditorChange}
        />
      </div>
      <div className="flex justify-center my-10 h-[34vh]">

      </div>
    </div>
  );
};

export default DraftForm;
