import { FC, useEffect, useState } from "react";
import { Button, Input, Label } from "@/components";
import { Link } from "@/Utils/Icons";
import { Editor } from "@tiptap/core";

interface LinkButtonProps {
  editor: Editor;
}

interface ErrorText {
  anchorError: string;
  urlError: string;
}

const getTheSelectedText = (editor: Editor): string => {
  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to);
  return text;
};

const LinkButton: FC<LinkButtonProps> = ({ editor }) => {
  const [url, setUrl] = useState<string>("");
  const [anchorText, setAnchorText] = useState<string>(
    getTheSelectedText(editor)
  );
  const [linkMenu, setLinkMenu] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<ErrorText>({
    anchorError: "",
    urlError: "",
  });

  const handleOpenLinkMenu = () => {
    const isActived = editor.isActive("link");

    if (isActived) {
      const attributes = editor.getAttributes("link");
      setUrl(attributes.href || "");
      // setAnchorText(getTheSelectedText(editor));
    } else {
      setUrl("");
      // setAnchorText("");
    }

    setLinkMenu((prev) => !prev);
  };

  const isHyperlinkValid = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
    setError(false);
  };

  const handleAchorTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAnchorText(value);

    if (value.trim() === "") {
      setError(true);
      setErrorText({
        anchorError: "Anchor text cannot be empty",
        urlError: "",
      });
    } else {
      setError(false);
      setErrorText({
        anchorError: "",
        urlError: "",
      });
    }

    setAnchorText(value);
    setError(false);
  };

  const handleInsertLink = () => {
    // Check if the URL is valid
    if (!isHyperlinkValid(url)) {
      setError(true);
      setErrorText({
        anchorError: "",
        urlError: "Invalid URL",
      });
      return;
    }

    // Check if the anchor text is empty
    if (anchorText.trim() === "") {
      setError(true);
      setErrorText({
        anchorError: "Anchor text cannot be empty",
        urlError: "",
      });
      return;
    }

    editor
      .chain()
      .focus()
      .deleteSelection()
      .insertContent(`<a href="${url}">${anchorText}</a>`)
      .run();

    // Move cursor outside the link
    editor.commands.insertContent(" ");

    setLinkMenu(false);
    setIsActive(false);
    setUrl("");
    setAnchorText("");
  };

  const handleUnLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkMenu(false);
    setIsActive(false);
    setUrl("");
    setAnchorText("");
  };

  useEffect(() => {
    editor.isActive("link");

    return () => {
      editor.off("selectionUpdate");
    };
  }, [editor]);

  useEffect(() => {
    const handleSelectionUpdate = () => {
      setIsActive(editor.isActive("link"));
      setAnchorText(getTheSelectedText(editor));
    };

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor]);

  return (
    <div className="relative flex-1 border">
      <Button
        variant={"link"}
        onClick={handleOpenLinkMenu}
        className={`p-2 text-gray-300 hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#0E0A06] rounded-md transition ${
          isActive ? "bg-orange-400 rounded-lg p-2 text-black" : ""
        }`}
      >
        <Link />
      </Button>
      {linkMenu && (
        <div className="absolute top-10 left-0 w-[20vw] bg-white dark:bg-slate-800 shadow-md rounded-lg border border-gray-200 space-y-2 z-30 p-5">
          <div className="flex items-center justify-between relative">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Add Hyperlink to text
            </h2>
            <Button
              variant="default"
              onClick={() => setLinkMenu(false)}
              aria-label="Close link menu"
              className="absolute -top-2 -right-2 h-6 w-6 flex justify-center items-center rounded-lg shadow-md"
            >
              &times;
            </Button>
          </div>

          <Label htmlFor="anchor">Anchor</Label>
          <Input
            type="text"
            id="anchor"
            value={anchorText}
            placeholder="Enter the URL link"
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md"
            onChange={handleAchorTextChange}
          />
          {error && <p className="text-red-500">{errorText.anchorError}</p>}
          <Label htmlFor="hyperlink">Hyperlink</Label>
          <Input
            type="text"
            id="hyperlink"
            value={url}
            placeholder="Enter the URL link"
            className="w-full p-2 border focus:ring-2 focus:ring-orange-500 border-gray-200 dark:border-gray-700 rounded-md"
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500">{errorText.urlError}</p>}
          <Button variant={"default"} onClick={handleInsertLink}>
            Apply
          </Button>
          <Button disabled={!url} variant={"link"} onClick={handleUnLink}>
            clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default LinkButton;
