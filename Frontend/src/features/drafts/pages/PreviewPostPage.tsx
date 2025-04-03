import { FC } from "react";
import { useParams } from "react-router-dom";
import PreviewMockup from "@/features/drafts/components/Preview/PreviewMockup";
import PreviewToggleDevice from "@/features/drafts/components/Preview/PreviewToggleDevice";
import { usePreview } from "../hooks/usePreview";
// import { PreviewDraft } from "../types";

const PreviewPostPage: FC = () => {
  const { draftId: id } = useParams<{ draftId: string }>();
  const { device, handleDeviceChange } = usePreview(id!);


  return (
    <div className="flex flex-col items-center justify-center w-full h-screen py-5 mx-auto">
      <PreviewToggleDevice onToggle={handleDeviceChange} />

      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        {device === "laptop" ? (
          <PreviewMockup 
            id={id!}
            mockupImage="/Laptop_Mockup.svg"
            altName="laptop-mockup"
            mockPlacement="w-full h-full relative overflow-hidden object-cover"
            placement="absolute rounded-lg overflow-y-auto w-[80%] h-[32%] top-48 left-[10%] hide-scrollbar px-1 sm:w-[68%] sm:h-[53%] sm:top-32 sm:left-[16%] sm:rounded-lg sm:bg-ember-500 sm:p-2 md:w-[66%] md:h-[57%] md:top-[20%] md:left-[16%] lg:w-[66%] lg:h-[73%] lg:top-[12%] lg:left-[17%] "
          />
        ) : (
          <PreviewMockup
            id={id!}
            mockupImage="/Image/mobile_mockup.png"
            altName="mobile-mockup"
            mockPlacement="w-full h-full relative overflow-hidden object-cover"
            placement="absolute rounded-lg p-2 over-x-hidden overflow-y-auto w-[70%] h-[70%] top-24 left-[16%] hide-scrollbar px-2 sm:w-[68%] sm:h-[53%] sm:top-32 sm:left-[16%] sm:rounded-lg sm:bg-ember-500 sm:p-2 md:w-[40%] md:h-[65%] md:top-[15%] md:left-[31%] lg:w-[38%] lg:h-[90%] lg:top-[5%] lg:left-[31%]"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPostPage;
