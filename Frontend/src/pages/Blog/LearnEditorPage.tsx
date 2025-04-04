import React from "react";
import { House } from "@/Utils/Icons";
import TiptapEditor from "@/features/editor/components/TiptapEditor/TipTapEditor";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/DarkMode/mode-toggle";

interface LearnEditorPageProps {
  title: string;
  setEditor: (editor: string) => void;
}


const LearnEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [editor, setEditor] = React.useState<LearnEditorPageProps>({
    title: "",
    setEditor: () => {},
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(editor);

    setEditor((prev) => ({ ...prev, title: e.target.value }));
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-[5vw] py-10">
      <div className="flex items-center justify-end w-full h-20 px-4 space-x-4">
        <Button
          variant={"outline"}
          onClick={() => navigate("/")}
          className="flex items-center justify-center rounded-lg text-md"
          >
          <House size={20} />
        </Button>
        <ModeToggle />
        
      </div>
      <div className="flex flex-col min-h-full w-[80vw] px-52  mx-auto space-y-3  rounded-lg ">
        <div className="flex flex-col justify-start w-full mb-4 space-y-4 ">
          <textarea
            placeholder="Article Title...."
            className="text-4xl font-bold border-none shadow-none outline-none resize-none px-2 focus:border-white focus:ring-0 focus:outline-none focus:ring-offset-white dark:bg-[#030712]"
            rows={2}
            maxLength={90}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px + 10px`;
              target.style.scrollbarWidth = "none";
              target.style.overflow = "hidden";
            }}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full min-h-full">
          <TiptapEditor initialContent={'<p></p>'} onContentChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default LearnEditorPage;
