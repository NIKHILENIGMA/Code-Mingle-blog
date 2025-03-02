import { FC, useEffect } from "react";
import ShowBlogCoverImage from "@/features/Blog/components/BlogImages/ShowBlogCoverImage";
import TiptapEditor from "@/features/Blog/components/Editor/TipTapEditor";
import CoverImagePopover from "@/features/Blog/components/BlogImages/CoverImagePopover";
import { useImage } from "../../hooks/useImage";
import DraftTitle from "./DraftTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSelectedDraft, updateSelectedDraft } from "../../slices/draftSlice";
import { useParams } from "react-router-dom";
import { getDraftService } from "@/services/api/draftApiServices";
import { Draft } from "@/Types/draft";


const DraftForm: FC = () => {
  const { draftId } = useParams<{ draftId: string }>();
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );
  const dispatch = useDispatch();

  const { blogCoverImg } = useImage();
  /// Changes handler for the title and content of the draft
  const handleTitleChange = (newTitle: string) => {
    // Dispatches the new title to the store
    dispatch(updateSelectedDraft({ ...selectedDraft, title: newTitle }));
  };
  const handleEditorChange = (updatedContent: string) => {
    dispatch(
      updateSelectedDraft({ ...selectedDraft, content: updatedContent })
    );
  };

  useEffect(() => {
    const getDraft = async () => {
      return await getDraftService(draftId ? draftId : "");
    };
    const fetchDraft = async () => {
      if (draftId && selectedDraft === null) {
        const response = await getDraft();
        dispatch(setSelectedDraft({selectedDraft: response.data.draft as Draft}));
      }
    };
    fetchDraft();
  }, [dispatch, draftId, selectedDraft]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-2 py-20 pr-10 mt-5">
      <div className="flex flex-col h-full w-[80vw] p-2 lg:pl-32 mx-auto space-y-3 rounded-lg">
        <div className="flex flex-col justify-start w-full mb-4 space-y-4">
          {blogCoverImg ? (
            <ShowBlogCoverImage image={blogCoverImg} />
          ) : (
            <CoverImagePopover className="w-1/4" />
          )}

          <DraftTitle
            name="title"
            title={selectedDraft?.title || ""}
            onTitleChange={handleTitleChange}
          />
        </div>

        <div className="w-full h-full space-y-4">
          <TiptapEditor
            initialContent={selectedDraft?.content || ""}
            onContentChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DraftForm;
