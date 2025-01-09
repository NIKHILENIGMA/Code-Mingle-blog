import { Button, Label } from "@/components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { Trash } from "lucide-react";
import React from "react";


interface AIWriterNodeViewProps {
  editor: Editor;
  getPos: () => number;
}

const AIWriterNodeView: React.FC<AIWriterNodeViewProps> = ({ editor, getPos }) => {
  const [prompt, setPrompt] = React.useState<string>("");
  const debouncedPrompt = useDebounce(prompt, 1000);

  const handlePrompt = () => {
    // Call the AI Writer API to generate text
    // const result = Promise.resolve("AI generated text");
    console.log(debouncedPrompt);
    const pos = getPos();
    editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + 1 })
      .run();
  };

  const handleRemove = () => {
    // Remove the AI Writer node
    console.log("Remove AI Writer node");
  };

  return (
    <NodeViewWrapper as="div" className="ai-writer">
      <div className="flex flex-col items-center justify-center p-2 border-2 border-black rounded-lg shadow-sm border-opacity-45">
        <div className="flex flex-col items-start w-full space-y-1">
          <Label id="ai-" className="font-normal text-start text-wrap ">
            Prompt{" "}
          </Label>

          <Textarea
            id="ai-writer-textarea"
            placeholder="Write your prompt here..."
            onChange={(e) => setPrompt((e.target as HTMLTextAreaElement).value)}
            className="w-full p-4 text-lg bg-gray-100 rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-md"
            cols={5}
            rows={5}
          />
        </div>
        <div className="flex items-center justify-between w-full px-2 py-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change Tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tone</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={handleRemove}>
            <Trash size={18} />
            Discard
          </Button>
          <Button onClick={handlePrompt}>Generate</Button>
        </div>
        {/* 

         */}
      </div>
    </NodeViewWrapper>
  );
};

export default AIWriterNodeView;
