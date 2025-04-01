import { FC } from "react";
import { useParams } from "react-router-dom";
import PreviewMockup from "@/features/drafts/components/Preview/PreviewMockup";
import PreviewToggleDevice from "@/features/drafts/components/Preview/PreviewToggleDevice";
import { usePreview } from "../hooks/usePreview";

const PreviewPostPage: FC = () => {
  const { draftId: id } = useParams<{ draftId: string }>();
  const { device, handleDeviceChange, DraftPreview, isLoading, isError } =
    usePreview(id!);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-5 mx-auto">
      <PreviewToggleDevice onToggle={handleDeviceChange} />

      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        {device === "laptop" ? (
          <PreviewMockup
            selectedDraft={DraftPreview}
            mockupImage="/Laptop_Mockup.svg"
            altName="laptop-mockup"
            mockPlacement="w-[100%] h-[90%] "
            placement="top-[14%] left-[17%] w-[66%] h-[68%] p-8 rounded-lg  overflow-y-auto"
            isLoading={isLoading}
            isError={isError}
          />
        ) : (
          <PreviewMockup
            selectedDraft={DraftPreview}
            mockupImage="/Image/mobile_mockup.png"
            altName="mobile-mockup"
            placement="top-[10%] left-[34%] w-[35%] h-[80%] p-8  rounded-lg overflow-y-auto hide-scrollbar"
            mockPlacement="w-[100%] h-[100%]"
            isLoading={isLoading}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPostPage;
