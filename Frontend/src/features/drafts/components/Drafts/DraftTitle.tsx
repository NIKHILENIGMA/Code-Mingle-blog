import { FC, useEffect, useRef } from "react";

interface DraftTitleProps {
  name: string;
  rows?: number;
  column?: number;
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const DraftTitle: FC<DraftTitleProps> = ({
  name,
  rows,
  column,
  title,
  onTitleChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]); // Runs when the title changes
  return (
    <textarea
      ref={textareaRef}
      name={name}
      rows={rows}
      maxLength={column}
      value={title}
      placeholder="Article Title...."
      onChange={(e) => onTitleChange(e.target.value)}
      className="bg-background resize-none text-3xl p-2 w-full font-bold outline-none hide-scrollbar"
      style={{ overflow: "hidden" }} // Prevents scrollbar flickering
    />
  );
};

export default DraftTitle;
