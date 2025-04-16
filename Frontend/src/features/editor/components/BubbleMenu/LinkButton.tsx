import { FC, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import TooltipLink from "./TooltipLink";
import LinkModal from "./LinkModal";

interface LinkButtonProps {
  editor: Editor;
}

const LinkButton: FC<LinkButtonProps> = ({ editor }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <div ref={buttonRef}>
        <TooltipLink
          editor={editor}
          onToggleModal={() => setShowMenu((prev) => !prev)}
        />
      </div>

      {showMenu && (
        <div ref={modalRef}>
          <LinkModal editor={editor} onToggleMenu={() => setShowMenu(false)} />
        </div>
      )}
    </>
  );
};


export default LinkButton;
