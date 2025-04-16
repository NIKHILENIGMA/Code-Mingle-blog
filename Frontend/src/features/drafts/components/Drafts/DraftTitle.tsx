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
  rows = 1,
  column,
  title,
  onTitleChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  return (
    <textarea
      ref={textareaRef}
      name={name}
      rows={rows}
      maxLength={column}
      value={title}
      placeholder="Article Title..."
      onChange={(e) => onTitleChange(e.target.value)}
      className="w-full resize-none text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold p-2 break-words outline-none bg-background   hide-scrollbar leading-snug"
    />
  );
};

export default DraftTitle;
