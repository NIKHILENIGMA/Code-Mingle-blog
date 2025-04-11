import { FC, useState } from "react";
import {
  Button,
  Input,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Link } from "@/Utils/Icons";
import { Editor } from "@tiptap/core";

interface LinkButtonProps {
  editor: Editor;
}

const getTheSelectedText = (editor: Editor): string => {
  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to);
  return text;
};

const LinkButton: FC<LinkButtonProps> = ({ editor }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(getTheSelectedText(editor));

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"link"}
              onClick={() => setShowMenu((prev: boolean) => !prev)}
            >
              <Link
                className={`${
                  editor.isActive("link")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-[9999] space-x-3">
            <div className="flex flex-col items-center space-y-1">
              <p className="text-sm font-medium">
                Link
              </p>
              <span className="text-xs text-muted-foreground">
                Ctrl + K
              </span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showMenu && (
        <div className="absolute w-[30vw] bg-background border border-primary/50 top-[110%] rounded-lg space-y-2 left-[20%] p-4 flex flex-col shadow-md">
          <Label htmlFor="embbed-link">Embbed Link</Label>
          <Input
            id="embbed-link"
            placeholder="Enter Url link"
            value={url}
            type="text"
            className="w-full"
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            variant={"default"}
            onClick={() =>
              editor.chain().focus().toggleLink({ href: url }).run()
            }
            className="w-full"
          >
            upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default LinkButton;
