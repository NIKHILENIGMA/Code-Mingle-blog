import { FC } from "react";
import { Button } from "@/components";
import PublishButton from "./PublishButton";
import { ModeToggle } from "@/components/mode-toggle";
import { ScanEye, Save } from "@/Utils/Icons";
import { useDraftActions } from "../../hooks/useDraftActions";

type ActionOptions = {
  name: string;
  icon: JSX.Element;
  action: () => void;
  variant?: "secondary" | "default";
};

const DraftActions: FC = () => {
  const { handleSave, handlePreview } = useDraftActions();

  const actionOptions: ActionOptions[] = [
    {
      name: "Preview",
      icon: <ScanEye size={16} />,
      action: handlePreview,
      variant: "secondary",
    },
    {
      name: "Save",
      icon: <Save size={16} />,
      action: handleSave,
      variant: "secondary",
    },
  ];

  return (
    <div className="flex justify-between items-center mb-4 p-3">
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
