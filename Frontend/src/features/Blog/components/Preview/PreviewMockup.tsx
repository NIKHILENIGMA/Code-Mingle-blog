import { Draft } from "@/Types/draft";
import { draftHtml } from "@/Utils/DraftHTML";
import { FC } from "react";

interface PreviewMockupProps {
  selectedDraft: Draft;
  type: "laptop" | "mobile";
  mockupImage?: string;
  altName?: string;
  mockPlacement?: string;
  placement?: string;
}

const PreviewMockup: FC<PreviewMockupProps> = ({
  selectedDraft,
  mockupImage,
  altName,
  mockPlacement,
  placement,
  type
  
}) => {
  const renderHTML = draftHtml(selectedDraft?.title || "", selectedDraft?.content || "");

  return (
    <div className={"relative flex items-center w-3/4 h-full overflow-hidden"}>
      <img
        src={mockupImage}
        alt={altName}
        className={`${mockPlacement} w-full overflow-hidden object-cover `}
      />
      <div className={`${placement} absolute`}>
        <iframe
          srcDoc={renderHTML}
          title={`Draft Preview -${type}`}
          className="w-full h-full overflow-hidden"
        />
      </div>
    </div>
  );
};

export default PreviewMockup;
