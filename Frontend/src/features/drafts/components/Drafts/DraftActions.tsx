import { FC } from "react";
import { Button } from "@/components";
import PublishButton from "./PublishButton";
import { ModeToggle } from "@/components/DarkMode/mode-toggle";
import { ScanEye, Save } from "@/Utils/Icons";
import { useDraftActions } from "../../hooks/useDraftActions";

type ActionOptions = {
  name: string;
  icon: JSX.Element;
  action: () => void;
  variant?: "secondary" | "default" | "link" | "destructive" | "ghost" | "outline";
};

const DraftActions: FC = () => {
  const { handleSave, handlePreview } = useDraftActions();

  const actionOptions: ActionOptions[] = [
    {
      name: "Preview",
      icon: <ScanEye size={16} />,
      action: handlePreview,
      variant: "outline",
    },
    {
      name: "Save",
      icon: <Save size={16} />,
      action: handleSave,
      variant: "outline",
    },
  ];

  return (
    <div className="flex justify-center md:justify-end items-center mb-4 p-3 gap-2 z-10 top-0">
      <div className="flex gap-2">
        {actionOptions.map((action: ActionOptions, index) => (
          <Button
            key={action?.name + index}
            variant={action?.variant}
            onClick={action?.action}
          >
            {action?.icon} {action?.name}
          </Button>
        ))}
        <PublishButton />
      </div>
      <ModeToggle />
    </div>
  );
};

export default DraftActions;
