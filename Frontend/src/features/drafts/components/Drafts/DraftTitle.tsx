import { FC } from "react";

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
  return (
    <textarea
      name={name}
      rows={rows ? rows : 1}
      maxLength={column ? column : 90}
      value={title}
      placeholder="Article Title...."
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }}
      onChange={(e) => onTitleChange(e.target.value)}
      className="bg-background resize-none text-3xl p-2 w-full font-bold outline-none border-b-2 border-primary-100 "
      
    />
  );
};

export default DraftTitle;
