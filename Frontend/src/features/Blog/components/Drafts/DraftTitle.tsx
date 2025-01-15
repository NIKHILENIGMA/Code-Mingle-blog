import { FC } from "react";
import { Textarea } from "@/components/ui/textarea";

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
    <Textarea
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
      className="text-3xl font-bold border-none shadow-none outline-none resize-none focus:border-white focus:ring-0 focus:outline-none focus:ring-offset-white"
    />
  );
};

export default DraftTitle;
