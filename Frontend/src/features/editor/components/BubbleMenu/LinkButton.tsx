import { FC, useState } from "react";
import { Button, Input, Label } from "@/components";
import { Link } from "@/Utils/Icons";
import { Editor } from "@tiptap/core";

interface LinkButtonProps {
  editor: Editor;
}

// interface ErrorText {
//   anchorError: string;
//   urlError: string;
// }

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
        className={`${
          editor.isActive("link") ? "bg-orange-500 text-white" : ""
        }`}
      >
        <Link />
      </Button>
      {showMenu && (
        <div className="absolute w-[30vw] bg-white top-[90%] rounded-lg space-y-2 left-[50%] p-4 flex flex-col">
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
            variant={"outline"}
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
