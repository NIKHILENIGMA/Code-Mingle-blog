import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Input, Label } from "@/components";
import { Editor } from "@tiptap/core";
import { isValidURL } from "@/Utils/isValidUrl";
import { Link } from '@/Utils/Icons';

interface LinkModalProps {
  editor: Editor; // Replace with the correct type for your editor
  onToggleMenu: () => void;
}

const getSelectedTextFromEditor = (editor: Editor): string => {
  if (!editor) return "";
  const { from, to } = editor.state.selection;
  return editor.state.doc.textBetween(from, to);
};

/**
 * LinkModal component for displaying a modal to insert a link in the editor.
 * @param {Editor} editor - The editor instance.
 * @param {Function} onToggleMenu - Function to toggle the menu visibility.
 */
const LinkModal: FC<LinkModalProps> = ({ editor, onToggleMenu }) => {
  const [link, setLink] = useState({
    url: editor.getAttributes("link").href || "",
    text: getSelectedTextFromEditor(editor),
  });

  const handleUpdateLink = () => {
    if (!link.url) return;

    if (isValidURL(link?.url) === false) {
      alert("Please enter a valid URL.");
      return;
    }
    // const { from, to } = editor.state.selection;

    editor
      .chain()
      .focus()
      .insertContentAt(editor.state.selection, {
        type: "text",
        text: link.text,
        marks: [{ type: "link", attrs: { href: link.url } }],
      })
      .run();

    onToggleMenu();
  };

  useEffect(() => {
    setLink({
      url: editor.getAttributes("link").href || "",
      text: getSelectedTextFromEditor(editor),
    });
  }, [editor, editor.state.selection]); // Re-run when editor or selection changes

  return (
    <div className="absolute w-[30vw] bg-background border border-secondary top-[110%] rounded-lg space-y-2 left-[20%] p-4 flex flex-col shadow-md">
      <h2 className="flex text-foreground text-xl space-x-2 font-semibold">
        <Link /><span >Insert Link</span>
      </h2>
      <Label htmlFor="anchor-text">Anchor Text: </Label>
      <Input
        type="text"
        id="anchor-text"
        value={link?.text}
        placeholder="Enter Anchor Text"
        className="w-full"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLink({
            ...link,
            text: e.target.value,
          })
        }
      />
      <Label htmlFor="embbed-link">Embbed Link: </Label>
      <Input
        id="embbed-link"
        type="text"
        value={link?.url}
        autoComplete="off"
        placeholder="Enter Url link"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLink({
            ...link,
            url: e.target.value,
          })
        }
        className="w-full"
      />
      <Button variant={"default"} onClick={handleUpdateLink} className="w-full">
        upload
      </Button>
    </div>
  );
};

export default LinkModal;
