import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import PreviewMockup from "@/features/drafts/components/Preview/PreviewMockup";
import PreviewToggleDevice from "@/features/drafts/components/Preview/PreviewToggleDevice";
import { Draft } from "@/Types/draft";

const PreviewPostPage: FC = () => {
  const [device, setDevice] = useState<"laptop" | "mobile">("laptop");

  const handleDeviceChange = (deviceType: 'laptop' | 'mobile') => {
    setDevice(deviceType);
  };

  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-5 mx-auto">
      <PreviewToggleDevice onToggle={handleDeviceChange} />

      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        {device === "laptop" ? (
          <PreviewMockup
            selectedDraft={selectedDraft as Draft}
            type="laptop"
            mockupImage="/Laptop_Mockup.svg"
            altName="laptop-mockup"
            mockPlacement="w-[100%] h-[90%] "
            placement="top-[14%] left-[17%] w-[66%] h-[68%]"
          />
        ) : (
          <PreviewMockup
            selectedDraft={selectedDraft as Draft}
            type="mobile"
            mockupImage="/Image/mobile_mockup.png"
            altName="mobile-mockup"
            placement="top-[10%] left-[34%] w-[35%] h-[80%]"
            mockPlacement="w-[100%] h-[100%]"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPostPage;
