import { FC, useState } from "react";
import { Button, Input, Label } from "@/components";
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
      <Button
        variant={"link"}
        onClick={() => setShowMenu((prev: boolean) => !prev)}
      >
        <Link
          className={`${
            editor.isActive("link") ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </Button>
      {showMenu && (
        <div className="absolute w-[30vw] bg-background border border-muted-foreground top-[90%] rounded-lg space-y-2 left-[50%] p-4 flex flex-col">
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
