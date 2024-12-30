import React from "react";
import { House, Moon } from "@/Utils/Icons";
import { Textarea } from "@/components/ui/textarea";
import TiptapEditor from "@/features/Blog/components/TipTapEditor";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

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
        <Button
          onClick={() => navigate("/")}
          variant={"secondary"}
          className="flex items-center justify-center rounded-lg text-md"
        >
          <Moon size={20} />
        </Button>
        
      </div>
      <div className="flex flex-col h-full w-[80vw] p-2 lg:pl-32 mx-auto space-y-3  rounded-lg">
        <div className="flex flex-col justify-start w-full mb-4 space-y-4 ">
          <Textarea
            placeholder="Article Title...."
            className="text-3xl font-bold border-none shadow-none outline-none resize-none focus:border-white focus:ring-0 focus:outline-none focus:ring-offset-white"
            rows={1}
            maxLength={90}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full h-full">
          <TiptapEditor onContentChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default LearnEditorPage;
