import { FC } from "react";
import Loader from "@/components/Loader/Loader";
import RenderDraftPreview from "./RenderDraftPreview";

interface PreviewDraft {
  preview: {
    id: string;
    title: string;
    slug: string | null;
    content: string;
    image: string;
    readTime: null;
    category: null;
    author: {
      id: string;
      username: string;
      avatarImg: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

interface PreviewMockupProps {
  selectedDraft: PreviewDraft;
  mockupImage?: string;
  altName?: string;
  mockPlacement?: string;
  placement?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const PreviewMockup: FC<PreviewMockupProps> = ({
  selectedDraft,
  mockupImage,
  altName,
  mockPlacement,
  placement,
  isLoading,
}) => {
  return (
    <div className={"relative flex items-center w-3/4 h-full overflow-hidden"}>
      <img
        src={mockupImage}
        alt={altName}
        className={`${mockPlacement} w-full overflow-hidden object-cover `}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <RenderDraftPreview styles={placement ?? ""} draft={selectedDraft?.preview} />
      )}
    </div>
  );
};

export default PreviewMockup;
